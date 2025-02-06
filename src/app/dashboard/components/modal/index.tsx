"use client";

import styles from './styles.module.scss';
import { X } from 'lucide-react';
import { use } from 'react';
import { OrderContext } from '@/providers/order';
import { calculateTotalOrder } from '@/lib/helper';

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    await finishOrder(order[0].order.id);
  }

  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button 
          className={styles.dialogBack}
          onClick={onRequestClose}
        >
          <X size={40} color="var(--red-900)" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do Pedido</h2>

          <span className={styles.table}>
            Mesa <strong>{order[0].order.table}</strong>
          </span>

          {order[0].order?.name && (
            <span className={styles.name}>
              <strong>{order[0].order.name}</strong>
            </span>
          )}

          {order.map(item => (
            <section 
              className={styles.item}
              key={item.id}
            >
              <span>Qtd: ( {item.amount} ) <strong>{item.product.name}</strong><span className={styles.unitValue}> - R$ {(item.product.price * item.amount).toFixed(2)}</span></span>
              <span className={styles.description}>{item.product.description}</span>
            </section>
          ))}

          <h3 className={styles.total}>Total do pedido: R$ {calculateTotalOrder(order).toFixed(2)}</h3>

          <button 
            className={styles.buttonOrder}
            onClick={handleFinishOrder}
          >
            Concluir Pedido
          </button>
        </article>
      </section>
    </dialog>
  )
}