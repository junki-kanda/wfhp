import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client for storage operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Initialize storage buckets on startup
const initializeStorage = async () => {
  try {
    const buckets = ["make-99d1dd43-contact-files", "make-99d1dd43-img"];
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    
    for (const bucketName of buckets) {
      const bucketExists = existingBuckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        console.log('Creating storage bucket:', bucketName);
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: bucketName === "make-99d1dd43-img" // Make img bucket public for easier access
        });
        if (error) {
          console.error('Failed to create bucket:', bucketName, error);
        } else {
          console.log('Storage bucket created successfully:', bucketName);
        }
      } else {
        console.log('Storage bucket already exists:', bucketName);
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

// Initialize storage on startup
initializeStorage();

// Email sending function using Resend API with attachment support
// 
// PRODUCTION SETUP COMPLETE:
// ✓ Domain verification completed for wst-f.com
// ✓ From address set to noreply@wst-f.com
// ✓ Notification email set to info@wst-f.com
//
const sendEmail = async (to: string, subject: string, html: string, attachments?: any[]) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return { success: false, error: 'Email service not configured' };
    }

    console.log('Attempting to send email to:', to);
    console.log('API Key present:', resendApiKey ? 'Yes' : 'No');
    console.log('API Key length:', resendApiKey?.length || 0);
    console.log('Attachments count:', attachments?.length || 0);

    const emailData: any = {
      from: 'WisteriaForest <noreply@wst-f.com>',
      to: [to],
      subject: subject,
      html: html,
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments;
      console.log('Email attachments details:');
      attachments.forEach((att, index) => {
        console.log(`Attachment ${index + 1}:`, {
          filename: att.filename,
          type: att.type,
          contentLength: att.content?.length || 0,
          hasContent: !!att.content
        });
      });
    }

    console.log('Final email data structure (without content):', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      hasHtml: !!emailData.html,
      attachmentCount: emailData.attachments?.length || 0
    });

    const requestBody = JSON.stringify(emailData);
    console.log('Request body size:', requestBody.length, 'characters');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response body:', responseText);

    if (!response.ok) {
      console.error('Failed to send email:', response.status, responseText);
      
      // Try to parse error response for more details
      try {
        const errorData = JSON.parse(responseText);
        console.error('Parsed error data:', errorData);
        
        // Handle specific Resend errors
        if (response.status === 422 && errorData.message) {
          return { success: false, error: `Validation error: ${errorData.message}` };
        }
        
        if (response.status === 403 && responseText.includes('testing emails')) {
          console.error('Resend domain verification required. Current limitations:');
          console.error('- Can only send to verified email address in testing mode');
          console.error('- Set up domain verification at https://resend.com/domains for production');
          return { success: false, error: `Domain verification required for production emails: ${responseText}` };
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
      }
      
      return { success: false, error: `Email sending failed: ${response.status} - ${responseText}` };
    }

    const result = JSON.parse(responseText);
    console.log('Email sent successfully:', result.id);
    console.log('Attachments were included:', emailData.attachments?.length > 0 ? 'Yes' : 'No');
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Generate email content for contact form submissions
const generateContactEmailContent = (submissionData: any) => {
  const formTypeNames = {
    'consultation': '事業に関するご相談',
    'download': '資料ダウンロード',
    'career': '採用エントリー'
  };

  const formTypeName = formTypeNames[submissionData.formType] || submissionData.formType;
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans JP', sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #0b430b, #22c55e); 
          color: white; 
          padding: 20px; 
          border-radius: 8px 8px 0 0; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: 600; 
        }
        .content { 
          background: #ffffff; 
          border: 1px solid #e5e7eb; 
          border-top: none; 
          padding: 30px; 
          border-radius: 0 0 8px 8px; 
        }
        .info-section { 
          margin-bottom: 25px; 
          padding: 20px; 
          background: #f9fafb; 
          border-radius: 6px; 
          border-left: 4px solid #0b430b; 
        }
        .info-section h3 { 
          margin: 0 0 15px 0; 
          color: #0b430b; 
          font-size: 18px; 
          font-weight: 600; 
        }
        .info-row { 
          display: flex; 
          margin-bottom: 10px; 
          border-bottom: 1px solid #e5e7eb; 
          padding-bottom: 8px; 
        }
        .info-row:last-child { 
          border-bottom: none; 
          margin-bottom: 0; 
        }
        .info-label { 
          font-weight: 600; 
          color: #374151; 
          min-width: 120px; 
          margin-right: 15px; 
        }
        .info-value { 
          color: #111827; 
          flex: 1; 
        }
        .message-box { 
          background: #f3f4f6; 
          border: 1px solid #d1d5db; 
          border-radius: 6px; 
          padding: 20px; 
          margin: 15px 0; 
          white-space: pre-wrap; 
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace; 
          font-size: 14px; 
          line-height: 1.5; 
        }
        .attachment-item { 
          background: #fef3c7; 
          border: 1px solid #fbbf24; 
          border-radius: 6px; 
          padding: 12px; 
          margin: 8px 0; 
          display: flex; 
          align-items: center; 
          gap: 10px; 
        }
        .attachment-icon { 
          background: #f59e0b; 
          color: white; 
          width: 24px; 
          height: 24px; 
          border-radius: 4px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 12px; 
          font-weight: bold; 
        }
        .footer { 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
          font-size: 12px; 
          color: #6b7280; 
          text-align: center; 
        }
        .badge { 
          display: inline-block; 
          padding: 4px 12px; 
          background: #dcfce7; 
          color: #166534; 
          border-radius: 20px; 
          font-size: 12px; 
          font-weight: 600; 
          margin-bottom: 15px; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📧 新しいお問い合わせ</h1>
        <div class="badge">${formTypeName}</div>
      </div>
      
      <div class="content">
        <div class="info-section">
          <h3>📝 基本情報</h3>
          <div class="info-row">
            <div class="info-label">受付日時:</div>
            <div class="info-value">${new Date(submissionData.submittedAt).toLocaleString('ja-JP', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              weekday: 'long'
            })}</div>
          </div>
          <div class="info-row">
            <div class="info-label">お問い合わせID:</div>
            <div class="info-value"><code>${submissionData.id}</code></div>
          </div>
        </div>

        <div class="info-section">
          <h3>👤 お客様情報</h3>
          <div class="info-row">
            <div class="info-label">お名前:</div>
            <div class="info-value">${submissionData.name}</div>
          </div>
          <div class="info-row">
            <div class="info-label">メールアドレス:</div>
            <div class="info-value"><a href="mailto:${submissionData.email}">${submissionData.email}</a></div>
          </div>
          ${submissionData.tel ? `
          <div class="info-row">
            <div class="info-label">電話番号:</div>
            <div class="info-value"><a href="tel:${submissionData.tel}">${submissionData.tel}</a></div>
          </div>
          ` : ''}
        </div>
  `;

  // Add form-specific information
  if (submissionData.formType === 'consultation') {
    html += `
        <div class="info-section">
          <h3>🏠 ご相談内容</h3>
          ${submissionData.propertyLocation ? `
          <div class="info-row">
            <div class="info-label">物件所在地:</div>
            <div class="info-value">${submissionData.propertyLocation}</div>
          </div>
          ` : ''}
          ${submissionData.propertyType && submissionData.propertyType.length > 0 ? `
          <div class="info-row">
            <div class="info-label">物件種別:</div>
            <div class="info-value">${submissionData.propertyType.join(', ')}</div>
          </div>
          ` : ''}
          ${submissionData.budget ? `
          <div class="info-row">
            <div class="info-label">ご予算:</div>
            <div class="info-value">${submissionData.budget}</div>
          </div>
          ` : ''}
          ${submissionData.timeline ? `
          <div class="info-row">
            <div class="info-label">ご希望時期:</div>
            <div class="info-value">${submissionData.timeline}</div>
          </div>
          ` : ''}
        </div>
    `;
  } else if (submissionData.formType === 'download') {
    html += `
        <div class="info-section">
          <h3>📄 ダウンロード情報</h3>
          ${submissionData.company ? `
          <div class="info-row">
            <div class="info-label">会社名:</div>
            <div class="info-value">${submissionData.company}</div>
          </div>
          ` : ''}
          ${submissionData.position ? `
          <div class="info-row">
            <div class="info-label">お役職:</div>
            <div class="info-value">${submissionData.position}</div>
          </div>
          ` : ''}
          ${submissionData.purpose ? `
          <div class="info-row">
            <div class="info-label">ご利用目的:</div>
            <div class="info-value">${submissionData.purpose}</div>
          </div>
          ` : ''}
        </div>
    `;
  } else if (submissionData.formType === 'career') {
    html += `
        <div class="info-section">
          <h3>💼 応募情報</h3>
          ${submissionData.position ? `
          <div class="info-row">
            <div class="info-label">応募職種:</div>
            <div class="info-value">${submissionData.position}</div>
          </div>
          ` : ''}
          ${submissionData.experience ? `
          <div class="info-row">
            <div class="info-label">経験・スキル:</div>
            <div class="info-value">${submissionData.experience}</div>
          </div>
          ` : ''}
          ${submissionData.motivation ? `
          <div class="info-row">
            <div class="info-label">志望動機:</div>
            <div class="info-value">${submissionData.motivation}</div>
          </div>
          ` : ''}
        </div>
    `;
  }

  // Add message if provided
  if (submissionData.message) {
    html += `
        <div class="info-section">
          <h3>💬 メッセージ</h3>
          <div class="message-box">${submissionData.message}</div>
        </div>
    `;
  }

  // Add attachment information
  if (submissionData.attachments && submissionData.attachments.length > 0) {
    html += `
        <div class="info-section">
          <h3>📎 添付ファイル</h3>
    `;
    for (const attachment of submissionData.attachments) {
      html += `
          <div class="attachment-item">
            <div class="attachment-icon">📄</div>
            <div>
              <div style="font-weight: 600; color: #92400e;">
                ${attachment.fieldName === 'resume' ? '📄 履歴書' : '📁 添付ファイル'}
              </div>
              <div style="font-size: 14px; color: #78716c;">
                ${attachment.fileName} (${Math.round(attachment.fileSize / 1024)}KB)
              </div>
            </div>
          </div>
      `;
    }
    html += `</div>`;
  }

  html += `
        <div class="footer">
          <p>
            🤖 このメールは WisteriaForest のお問い合わせフォームから自動送信されています。<br>
            📋 お問い合わせの詳細確認や添付ファイルのダウンロードは、管理画面をご確認ください。
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
};

// Health check endpoint
app.get("/make-server-99d1dd43/health", (c) => {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const hasResendKey = !!resendApiKey;
  const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL') || 'info@wst-f.com';
  
  return c.json({ 
    status: "ok",
    emailService: hasResendKey ? "configured" : "not_configured",
    apiKeyLength: resendApiKey?.length || 0,
    notificationEmail: notificationEmail,
    domainSetupRequired: !Deno.env.get('NOTIFICATION_EMAIL'),
    environment: {
      supabaseUrl: !!Deno.env.get('SUPABASE_URL'),
      supabaseServiceKey: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
      resendKey: hasResendKey,
      notificationEmail: !!Deno.env.get('NOTIFICATION_EMAIL')
    }
  });
});

// Get all contact submissions (for admin)
app.get("/make-server-99d1dd43/contact/submissions", async (c) => {
  try {
    console.log('Fetching contact submissions...');
    
    // Get submissions list from KV store
    const submissionIds = await kv.get('contact_submissions_list') || [];
    console.log(`Found ${submissionIds.length} submission IDs`);
    
    if (submissionIds.length === 0) {
      return c.json({
        success: true,
        submissions: []
      });
    }
    
    // Get submission details for each ID
    const submissions = [];
    for (const submissionId of submissionIds.slice(0, 50)) { // Limit to 50 most recent
      try {
        const submission = await kv.get(submissionId);
        if (submission) {
          // Remove sensitive data and signed URLs for list view
          const sanitizedSubmission = {
            ...submission,
            attachments: submission.attachments?.map(att => ({
              fieldName: att.fieldName,
              fileName: att.fileName,
              fileSize: att.fileSize,
              contentType: att.contentType
            })) || []
          };
          submissions.push(sanitizedSubmission);
        }
      } catch (error) {
        console.warn(`Failed to load submission ${submissionId}:`, error);
      }
    }
    
    console.log(`Successfully loaded ${submissions.length} submissions`);
    
    return c.json({
      success: true,
      submissions
    });
    
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return c.json({ 
      success: false, 
      error: 'お問い合わせデータの取得に失敗しました' 
    }, 500);
  }
});

// Get detailed contact submission (for admin)
app.get("/make-server-99d1dd43/contact/submission/:submissionId", async (c) => {
  try {
    const submissionId = c.req.param('submissionId');
    console.log(`Fetching submission details for: ${submissionId}`);
    
    if (!submissionId) {
      return c.json({ 
        success: false, 
        error: 'Submission ID is required' 
      }, 400);
    }
    
    const submission = await kv.get(submissionId);
    
    if (!submission) {
      return c.json({ 
        success: false, 
        error: 'お問い合わせが見つかりません' 
      }, 404);
    }
    
    // Generate signed URLs for attachments
    if (submission.attachments && submission.attachments.length > 0) {
      for (const attachment of submission.attachments) {
        try {
          const { data: signedUrlData } = await supabase.storage
            .from('make-99d1dd43-contact-files')
            .createSignedUrl(attachment.filePath, 60 * 60); // 1 hour expiry
          
          if (signedUrlData?.signedUrl) {
            attachment.downloadUrl = signedUrlData.signedUrl;
          }
        } catch (error) {
          console.warn(`Failed to generate signed URL for ${attachment.filePath}:`, error);
        }
      }
    }
    
    console.log(`Successfully loaded submission details for: ${submissionId}`);
    
    return c.json({
      success: true,
      submission
    });
    
  } catch (error) {
    console.error('Error fetching submission details:', error);
    return c.json({ 
      success: false, 
      error: 'お問い合わせ詳細の取得に失敗しました' 
    }, 500);
  }
});

// Image upload endpoint for managing website images
app.post("/make-server-99d1dd43/images/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;
    const category = formData.get('category') as string || 'general';
    const name = formData.get('name') as string;
    
    if (!file || !name) {
      return c.json({ 
        success: false, 
        error: 'ファイルと名前が必要です' 
      }, 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ 
        success: false, 
        error: '画像ファイルのみアップロード可能です' 
      }, 400);
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ 
        success: false, 
        error: 'ファイルサイズが大きすぎます（5MB以下にしてください）' 
      }, 400);
    }

    // Generate filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${category}/${name}.${fileExtension}`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('make-99d1dd43-img')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true // Allow overwriting
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return c.json({ 
        success: false, 
        error: `画像のアップロードに失敗しました: ${uploadError.message}` 
      }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('make-99d1dd43-img')
      .getPublicUrl(fileName);

    console.log(`Image uploaded successfully: ${fileName}`);
    
    return c.json({
      success: true,
      message: '画像がアップロードされました',
      fileName,
      publicUrl: urlData?.publicUrl,
      category,
      name
    });

  } catch (error) {
    console.error('Error processing image upload:', error);
    return c.json({ 
      success: false, 
      error: 'サーバーエラーが発生しました' 
    }, 500);
  }
});

// Get image URL endpoint
app.get("/make-server-99d1dd43/images/:category/:name", async (c) => {
  try {
    const category = c.req.param('category');
    const name = c.req.param('name');
    
    // List files in the category folder
    const { data: files, error } = await supabase.storage
      .from('make-99d1dd43-img')
      .list(category);

    if (error) {
      console.error('Error listing images:', error);
      return c.json({ 
        success: false, 
        error: '画像の取得に失敗しました' 
      }, 500);
    }

    console.log(`Looking for image: ${category}/${name}`);
    console.log('Available files:', files?.map(f => f.name));

    // Find the file that matches the name
    // If name already includes extension, match exactly
    // If name doesn't include extension, match with common image extensions
    const imageFile = files?.find(file => {
      // Exact match (for files like DSCF1830.jpeg)
      if (file.name === name) {
        return true;
      }
      // Match without extension (for files like villa-1 matching villa-1.jpg)
      if (file.name.startsWith(name + '.') && 
          ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => 
            file.name.toLowerCase().endsWith('.' + ext)
          )) {
        return true;
      }
      return false;
    });

    console.log('Found image file:', imageFile?.name || 'none');

    if (!imageFile) {
      return c.json({ 
        success: false, 
        error: '画像が見つかりません' 
      }, 404);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('make-99d1dd43-img')
      .getPublicUrl(`${category}/${imageFile.name}`);

    return c.json({
      success: true,
      publicUrl: urlData?.publicUrl,
      fileName: imageFile.name,
      category,
      name
    });

  } catch (error) {
    console.error('Error getting image URL:', error);
    return c.json({ 
      success: false, 
      error: 'サーバーエラーが発生しました' 
    }, 500);
  }
});

// List images in a category
app.get("/make-server-99d1dd43/images/:category", async (c) => {
  try {
    const category = c.req.param('category');
    
    const { data: files, error } = await supabase.storage
      .from('make-99d1dd43-img')
      .list(category);

    if (error) {
      console.error('Error listing images:', error);
      return c.json({ 
        success: false, 
        error: '画像リストの取得に失敗しました' 
      }, 500);
    }

    const images = files?.map(file => {
      const { data: urlData } = supabase.storage
        .from('make-99d1dd43-img')
        .getPublicUrl(`${category}/${file.name}`);
      
      return {
        name: file.name,
        publicUrl: urlData?.publicUrl,
        size: file.metadata?.size,
        lastModified: file.updated_at
      };
    }) || [];

    return c.json({
      success: true,
      category,
      images
    });

  } catch (error) {
    console.error('Error listing images:', error);
    return c.json({ 
      success: false, 
      error: 'サーバーエラーが発生しました' 
    }, 500);
  }
});



// Contact form submission endpoint
app.post("/make-server-99d1dd43/contact", async (c) => {
  try {
    const formData = await c.req.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const tel = formData.get('tel') as string;
    const formType = formData.get('formType') as string;
    const message = formData.get('message') as string;
    
    // Validate required fields
    if (!name || !email || !formType) {
      return c.json({ 
        success: false, 
        error: '必須項目が入力されていません' 
      }, 400);
    }

    // Generate unique ID for this submission
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Prepare submission data
    const submissionData: any = {
      id: submissionId,
      name,
      email,
      tel: tel || null,
      formType,
      message: message || null,
      submittedAt: new Date().toISOString(),
      status: 'new',
      attachments: []
    };

    // Handle form-type specific fields
    if (formType === 'consultation') {
      submissionData.propertyLocation = formData.get('propertyLocation') as string;
      submissionData.propertyType = formData.getAll('propertyType[]');
      submissionData.budget = formData.get('budget') as string;
      submissionData.timeline = formData.get('timeline') as string;
    } else if (formType === 'career') {
      submissionData.position = formData.get('position') as string;
      submissionData.experience = formData.get('experience') as string;
      submissionData.motivation = formData.get('motivation') as string;
    } else if (formType === 'download') {
      submissionData.company = formData.get('company') as string;
      submissionData.position = formData.get('position') as string;
      submissionData.purpose = formData.get('purpose') as string;
    }

    // Handle file uploads
    const files = ['resume', 'attachment'];
    for (const fileField of files) {
      const file = formData.get(fileField) as File;
      if (file && file.size > 0) {
        try {
          // Validate file size (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            return c.json({ 
              success: false, 
              error: `${fileField}のファイルサイズが大きすぎます（5MB以下にしてください）` 
            }, 400);
          }

          // Generate unique filename
          const fileExtension = file.name.split('.').pop();
          const fileName = `${submissionId}/${fileField}_${Date.now()}.${fileExtension}`;
          
          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('make-99d1dd43-contact-files')
            .upload(fileName, file, {
              contentType: file.type,
              upsert: false
            });

          if (uploadError) {
            console.error(`Error uploading ${fileField}:`, uploadError);
            return c.json({ 
              success: false, 
              error: `ファイルのアップロードに失敗しました: ${uploadError.message}` 
            }, 500);
          }

          // Get signed URL for the uploaded file
          const { data: signedUrlData } = await supabase.storage
            .from('make-99d1dd43-contact-files')
            .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days expiry

          submissionData.attachments.push({
            fieldName: fileField,
            fileName: file.name,
            filePath: fileName,
            fileSize: file.size,
            contentType: file.type,
            signedUrl: signedUrlData?.signedUrl
          });

        } catch (error) {
          console.error(`Error processing file ${fileField}:`, error);
          return c.json({ 
            success: false, 
            error: `ファイル処理中にエラーが発生しました` 
          }, 500);
        }
      }
    }

    // Store submission data in KV store
    await kv.set(submissionId, submissionData);
    
    // Also store in a list for easy retrieval
    const existingSubmissions = await kv.get('contact_submissions_list') || [];
    existingSubmissions.unshift(submissionId); // Add to beginning of array
    
    // Keep only last 1000 submissions in the list
    if (existingSubmissions.length > 1000) {
      existingSubmissions.splice(1000);
    }
    
    await kv.set('contact_submissions_list', existingSubmissions);

    console.log(`Contact form submission saved: ${submissionId}`, {
      formType,
      name,
      email,
      hasAttachments: submissionData.attachments.length > 0
    });

    // Send email notification with attachments
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      try {
        const emailContent = generateContactEmailContent(submissionData);
        const formTypeNames = {
          'consultation': '事業に関するご相談',
          'download': '資料ダウンロード',
          'career': '採用エントリー'
        };
        const formTypeName = formTypeNames[submissionData.formType] || submissionData.formType;
        const emailSubject = `【WisteriaForest】新しいお問い合わせ - ${formTypeName} (${submissionData.name}様)`;
        
        console.log('Attempting to send email notification...');
        
        // Prepare attachments for email
        let emailAttachments = [];
        if (submissionData.attachments && submissionData.attachments.length > 0) {
          console.log('Processing attachments for email...');
          for (const attachment of submissionData.attachments) {
            try {
              console.log(`Processing attachment: ${attachment.fileName}`);
              console.log(`Attachment path: ${attachment.filePath}`);
              console.log(`Attachment type: ${attachment.contentType}`);
              
              // Download the file from Supabase Storage
              const { data: fileData, error: downloadError } = await supabase.storage
                .from('make-99d1dd43-contact-files')
                .download(attachment.filePath);
              
              if (downloadError) {
                console.error('Error downloading file for email attachment:', downloadError);
                continue;
              }
              
              if (!fileData) {
                console.error('No file data received from Supabase Storage');
                continue;
              }
              
              console.log(`File data size: ${fileData.size} bytes`);
              
              // Convert Blob to ArrayBuffer and then to base64
              const arrayBuffer = await fileData.arrayBuffer();
              const uint8Array = new Uint8Array(arrayBuffer);
              
              // Convert to base64 more efficiently
              let binaryString = '';
              for (let i = 0; i < uint8Array.length; i++) {
                binaryString += String.fromCharCode(uint8Array[i]);
              }
              const fileBase64 = btoa(binaryString);
              
              console.log(`Base64 conversion successful, length: ${fileBase64.length}`);
              
              // Determine proper MIME type based on file extension if contentType is missing
              let mimeType = attachment.contentType;
              if (!mimeType || mimeType === 'application/octet-stream') {
                const extension = attachment.fileName.split('.').pop()?.toLowerCase();
                switch (extension) {
                  case 'pdf':
                    mimeType = 'application/pdf';
                    break;
                  case 'doc':
                    mimeType = 'application/msword';
                    break;
                  case 'docx':
                    mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    break;
                  case 'txt':
                    mimeType = 'text/plain';
                    break;
                  case 'jpg':
                  case 'jpeg':
                    mimeType = 'image/jpeg';
                    break;
                  case 'png':
                    mimeType = 'image/png';
                    break;
                  case 'gif':
                    mimeType = 'image/gif';
                    break;
                  default:
                    mimeType = 'application/octet-stream';
                }
                console.log(`Detected MIME type for ${attachment.fileName}: ${mimeType}`);
              }

              // Use correct Resend API format
              const emailAttachment = {
                filename: attachment.fileName,
                content: fileBase64,
                type: mimeType
              };
              
              emailAttachments.push(emailAttachment);
              
              console.log(`Successfully prepared attachment for email:`, {
                filename: emailAttachment.filename,
                type: emailAttachment.type,
                contentLength: emailAttachment.content.length
              });
              
            } catch (attachmentError) {
              console.error('Error processing attachment for email:', attachmentError);
              console.error('Attachment details:', {
                fileName: attachment.fileName,
                filePath: attachment.filePath,
                fileSize: attachment.fileSize,
                contentType: attachment.contentType
              });
            }
          }
        }
        
        // Use environment variable for notification email, fallback to production email
        const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL') || 'info@wst-f.com';
        console.log('Sending notification to:', notificationEmail);
        console.log('Email attachments count:', emailAttachments.length);
        
        console.log('About to send email with the following details:');
        console.log('- To:', notificationEmail);
        console.log('- Subject:', emailSubject);
        console.log('- Attachments count:', emailAttachments.length);
        console.log('- Total email size estimate:', Math.round((emailContent.length + emailAttachments.reduce((sum, att) => sum + att.content.length, 0)) / 1024), 'KB');
        
        const emailResult = await sendEmail(notificationEmail, emailSubject, emailContent, emailAttachments);
        
        if (!emailResult.success) {
          console.warn('Email notification failed but form submission succeeded:', emailResult.error);
          // Continue processing - don't fail the form submission if email fails
        } else {
          console.log('✅ Email notification sent successfully!');
          console.log('- Email ID:', emailResult.id);
          console.log('- Attachments included:', emailAttachments.length);
          if (emailAttachments.length > 0) {
            console.log('- Attachment filenames:', emailAttachments.map(att => att.filename).join(', '));
          }
        }
      } catch (emailError) {
        console.warn('Error sending email notification but form submission succeeded:', emailError);
        // Continue processing - don't fail the form submission if email fails
      }
    } else {
      console.log('Email notifications disabled - RESEND_API_KEY not configured');
    }

    // Return success response
    return c.json({
      success: true,
      message: 'お問い合わせを受け付けました',
      submissionId,
      formType
    });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return c.json({ 
      success: false, 
      error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。' 
    }, 500);
  }
});

// Get contact form submissions (for admin use)
app.get("/make-server-99d1dd43/contact/submissions", async (c) => {
  try {
    const submissionsList = await kv.get('contact_submissions_list') || [];
    const submissions = [];
    
    // Get latest 20 submissions
    const recentSubmissions = submissionsList.slice(0, 20);
    
    for (const submissionId of recentSubmissions) {
      const submission = await kv.get(submissionId);
      if (submission) {
        // Remove sensitive file URLs from response
        const sanitizedSubmission = { ...submission };
        if (sanitizedSubmission.attachments) {
          sanitizedSubmission.attachments = sanitizedSubmission.attachments.map((att: any) => ({
            fieldName: att.fieldName,
            fileName: att.fileName,
            fileSize: att.fileSize,
            contentType: att.contentType
          }));
        }
        submissions.push(sanitizedSubmission);
      }
    }
    
    return c.json({
      success: true,
      submissions,
      total: submissionsList.length
    });
    
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return c.json({ 
      success: false, 
      error: 'データの取得に失敗しました' 
    }, 500);
  }
});

// Get specific submission with file access
app.get("/make-server-99d1dd43/contact/submission/:id", async (c) => {
  try {
    const submissionId = c.req.param('id');
    const submission = await kv.get(submissionId);
    
    if (!submission) {
      return c.json({ 
        success: false, 
        error: '指定されたお問い合わせが見つかりません' 
      }, 404);
    }

    // Generate fresh signed URLs for attachments
    if (submission.attachments && submission.attachments.length > 0) {
      for (const attachment of submission.attachments) {
        const { data: signedUrlData } = await supabase.storage
          .from('make-99d1dd43-contact-files')
          .createSignedUrl(attachment.filePath, 60 * 60 * 24); // 24 hours expiry
          
        attachment.downloadUrl = signedUrlData?.signedUrl;
      }
    }

    return c.json({
      success: true,
      submission
    });
    
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    return c.json({ 
      success: false, 
      error: 'データの取得に失敗しました' 
    }, 500);
  }
});

Deno.serve(app.fetch);