import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Pedido {
  id: string;
  dataPedido: string;
  dataEntrega: string;
  cliente: {
    nome: string;
    whatsapp: string;
    endereco: string;
  };
  categorias: string[];
  bolos: unknown[];
  bolosFalsos: unknown[];
  doces: unknown[];
  status: {
    contatoFeito: boolean;
    pago: boolean;
    finalizado: boolean;
  };
}

const DB_PATH = join(process.cwd(), 'src', 'data', 'pedidos.json');

function getPedidos(): Pedido[] {
  if (!existsSync(DB_PATH)) {
    return [];
  }
  try {
    const data = readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function savePedidos(pedidos: Pedido[]) {
  writeFileSync(DB_PATH, JSON.stringify(pedidos, null, 2));
}

export async function GET() {
  const pedidos = getPedidos();
  return NextResponse.json(pedidos);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const pedido: Pedido = {
      id: Date.now().toString(),
      dataPedido: new Date().toISOString(),
      dataEntrega: data.formData.dataEntrega,
      cliente: {
        nome: data.formData.nome,
        whatsapp: data.formData.whatsapp,
        endereco: `${data.formData.rua}, ${data.formData.bairro} - ${data.formData.cidade}/${data.formData.estado} - CEP: ${data.formData.cep}`,
      },
      categorias: data.categorias,
      bolos: data.bolos,
      bolosFalsos: data.bolosFalsos,
      doces: data.doces,
      status: {
        contatoFeito: false,
        pago: false,
        finalizado: false,
      },
    };

    const pedidos = getPedidos();
    pedidos.unshift(pedido);
    savePedidos(pedidos);

    return NextResponse.json({ success: true, id: pedido.id });
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar pedido' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, status } = data;

    const pedidos = getPedidos();
    const index = pedidos.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    pedidos[index].status = status;
    savePedidos(pedidos);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar pedido' },
      { status: 500 }
    );
  }
}
