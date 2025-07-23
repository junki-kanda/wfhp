import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { contactFormSchema, careerFormSchema } from '@/lib/validations';

// SendGrid設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // フォームタイプに応じたバリデーション
    let validatedData;
    if (type === 'career') {
      validatedData = careerFormSchema.parse(data);
    } else {
      validatedData = contactFormSchema.parse(data);
    }

    // メール内容の作成
    let subject = '';
    let htmlContent = '';
    
    if (type === 'consultation') {
      subject = '【開業相談】お問い合わせがありました';
      htmlContent = createConsultationEmail(validatedData);
    } else if (type === 'management') {
      subject = '【運営受託】お問い合わせがありました';
      htmlContent = createManagementEmail(validatedData);
    } else if (type === 'career') {
      subject = '【採用エントリー】応募がありました';
      htmlContent = createCareerEmail(validatedData);
      
      // Slack通知（採用の場合）
      if (process.env.HR_WEBHOOK_URL) {
        await notifySlack(validatedData);
      }
    }

    // SendGridでメール送信
    const msg = {
      to: process.env.SENDGRID_TO_EMAIL || 'contact@wisteriaforest.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@wisteriaforest.com',
      subject,
      html: htmlContent,
    };

    await sgMail.send(msg);

    // 自動返信メール
    const autoReplyMsg = {
      to: validatedData.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@wisteriaforest.com',
      subject: 'お問い合わせありがとうございます - WisteriaForest',
      html: createAutoReplyEmail(validatedData.name),
    };

    await sgMail.send(autoReplyMsg);

    return NextResponse.json(
      { message: '送信が完了しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: '送信中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

function createConsultationEmail(data: any): string {
  return `
    <h2>開業相談のお問い合わせ</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>お名前</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>メールアドレス</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>電話番号</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.tel || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>会社名</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.company || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>物件所在地</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.propertyLocation || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>物件種別</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.propertyType?.join(', ') || '未選択'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>ご相談内容</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td>
      </tr>
    </table>
  `;
}

function createManagementEmail(data: any): string {
  return `
    <h2>運営受託のお問い合わせ</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>お名前</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>メールアドレス</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>電話番号</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.tel || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>会社名</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.company || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>物件所在地</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.propertyLocation || '未入力'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>物件種別</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.propertyType?.join(', ') || '未選択'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>ご相談内容</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.message}</td>
      </tr>
    </table>
  `;
}

function createCareerEmail(data: any): string {
  return `
    <h2>採用エントリー</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>お名前</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>ふりがな</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.furigana}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>メールアドレス</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>電話番号</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.tel}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>希望職種</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.position}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>志望動機</strong></td>
        <td style="padding: 8px; border: 1px solid #ddd;">${data.motivation}</td>
      </tr>
    </table>
    <p><strong>※履歴書・職務経歴書が添付されています</strong></p>
  `;
}

function createAutoReplyEmail(name: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #014F86;">お問い合わせありがとうございます</h2>
      <p>${name} 様</p>
      <p>
        この度はWisteriaForestへお問い合わせいただき、誠にありがとうございます。<br>
        お送りいただいた内容を確認の上、担当者より24時間以内にご連絡させていただきます。
      </p>
      <p>
        今しばらくお待ちくださいますよう、お願い申し上げます。
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">
        株式会社WisteriaForest<br>
        軽井沢No.1バケーションレンタル運営会社<br>
        Email: contact@wisteriaforest.com<br>
        Web: https://wisteriaforest.com
      </p>
    </div>
  `;
}

async function notifySlack(data: any): Promise<void> {
  if (!process.env.HR_WEBHOOK_URL) return;

  const message = {
    text: '新しい採用エントリーがありました',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*新しい採用エントリー*\n\n*名前:* ${data.name}\n*希望職種:* ${data.position}\n*メール:* ${data.email}`,
        },
      },
    ],
  };

  try {
    await fetch(process.env.HR_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Slack notification error:', error);
  }
}
