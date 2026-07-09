import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const ORDERS_KEY = 'pedidos';

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

async function getPedidos(): Promise<Pedido[]> {
  const data = await redis.get<Pedido[]>(ORDERS_KEY);
  return data || [];
}

async function savePedidos(pedidos: Pedido[]) {
  await redis.set(ORDERS_KEY, pedidos);
}

export async function GET() {
  const pedidos = await getPedidos();
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
        endereco: data.formData.tipoLocal === 'barretos'
          ? 'Barretos - Retirada'
          : `${data.formData.rua}, ${data.formData.bairro} - ${data.formData.cidade}/${data.formData.estado} - CEP: ${data.formData.cep}`,
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

    const pedidos = await getPedidos();
    pedidos.unshift(pedido);
    await savePedidos(pedidos);

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
    const { id, ...updateData } = data;

    const pedidos = await getPedidos();
    const index = pedidos.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    if (updateData.status) {
      pedidos[index].status = updateData.status;
    }

    if (updateData.dataEntrega) {
      pedidos[index].dataEntrega = updateData.dataEntrega;
    }

    if (updateData.cliente) {
      pedidos[index].cliente = { ...pedidos[index].cliente, ...updateData.cliente };
    }

    if (updateData.bolos) {
      pedidos[index].bolos = updateData.bolos;
    }

    if (updateData.bolosFalsos) {
      pedidos[index].bolosFalsos = updateData.bolosFalsos;
    }

    if (updateData.doces) {
      pedidos[index].doces = updateData.doces;
    }

    await savePedidos(pedidos);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar pedido' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const pedidos = await getPedidos();
    const filteredPedidos = pedidos.filter((p) => p.id !== id);

    if (filteredPedidos.length === pedidos.length) {
      return NextResponse.json(
        { success: false, error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    await savePedidos(filteredPedidos);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao apagar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao apagar pedido' },
      { status: 500 }
    );
  }
}
