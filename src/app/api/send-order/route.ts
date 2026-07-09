import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderData {
  bolos: Array<{
    tipo: string;
    tamanho: string;
    recheio: string;
    cobertura: string;
    descricao?: string;
    observacoes?: string;
  }>;
  bolosFalsos: Array<{
    andares: number;
    descricao: string;
    observacoes?: string;
  }>;
  doces: Array<{
    nome: string;
    quantidade: number;
  }>;
  formData: {
    nome: string;
    whatsapp: string;
    dataEntrega: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

function formatOrderEmail(data: OrderData): string {
  let email = '<h2 style="color: #5f9ea0;">🎂 Pedido Renata Maria</h2>';

  if (data.bolos.length > 0) {
    email += '<h3 style="color: #333;">Bolos:</h3>';
    data.bolos.forEach((bolo, index) => {
      const tipo = bolo.tipo === 'artistico' ? 'Bolo Artístico (comestível)' : 'Bolo';
      email += `
        <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 8px;">
          <p><strong>${tipo} ${index + 1}:</strong></p>
          <p>- Tamanho: ${bolo.tamanho}</p>
          <p>- Recheio: ${bolo.recheio}</p>
          <p>- Cobertura: ${bolo.cobertura}</p>
          ${bolo.tipo === 'artistico' && bolo.descricao ? `<p>- Descrição: ${bolo.descricao}</p>` : ''}
          ${bolo.observacoes ? `<p><em>- Obs: ${bolo.observacoes}</em></p>` : ''}
        </div>
      `;
    });
  }

  if (data.bolosFalsos.length > 0) {
    email += '<h3 style="color: #333;">Bolos Falsos (Decoração):</h3>';
    data.bolosFalsos.forEach((bolo, index) => {
      email += `
        <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 8px;">
          <p><strong>Bolo Falso ${index + 1}:</strong></p>
          <p>- Andares: ${bolo.andares}</p>
          <p>- Descrição: ${bolo.descricao}</p>
          ${bolo.observacoes ? `<p><em>- Obs: ${bolo.observacoes}</em></p>` : ''}
        </div>
      `;
    });
  }

  if (data.doces.length > 0) {
    email += '<h3 style="color: #333;">Doces:</h3>';
    email += '<div style="padding: 10px; background: #f9f9f9; border-radius: 8px;">';
    data.doces.forEach((doce) => {
      email += `<p>- ${doce.nome} x${doce.quantidade}</p>`;
    });
    email += '</div>';
  }

  email += `
    <h3 style="color: #333; margin-top: 20px;">Dados de Contato e Endereço:</h3>
    <div style="padding: 10px; background: #f9f9f9; border-radius: 8px;">
      <p><strong>Nome:</strong> ${data.formData.nome}</p>
      <p><strong>WhatsApp:</strong> ${data.formData.whatsapp}</p>
      <p><strong>Data:</strong> ${new Date(data.formData.dataEntrega).toLocaleDateString('pt-BR')}</p>
      <p><strong>Endereço:</strong> ${data.formData.rua}, ${data.formData.bairro} - ${data.formData.cidade}/${data.formData.estado}</p>
      <p><strong>CEP:</strong> ${data.formData.cep}</p>
    </div>
  `;

  return email;
}

export async function POST(request: NextRequest) {
  try {
    const data: OrderData = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailHtml = formatOrderEmail(data);

    await transporter.sendMail({
      from: `"Renata Maria - Pedidos" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🎂 Novo Pedido - ${data.formData.nome}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao enviar pedido' },
      { status: 500 }
    );
  }
}
