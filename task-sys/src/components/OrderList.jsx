export default function OrderList({ data, onEdit, onDelete }) {
  return (
    <div className="space-y-3">
      {data.map((o) => (
        <div
          key={o._id}
          className="flex justify-between items-center bg-white p-4 rounded shadow"
        >
          <div>
            <h3 className="font-semibold">{o.product}</h3>
            <p>Customer: {o.customerId?.name}</p>
            <p>Qty: {o.quantity} | ${o.price}</p>
            <p>Status: {o.status}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(o)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(o._id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
