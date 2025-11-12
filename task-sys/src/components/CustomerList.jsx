export default function CustomerList({ data, onEdit, onDelete }) {
  return (
    <div className="space-y-3">
      {data.map((c) => (
        <div
          key={c._id}
          className="flex justify-between items-center bg-white p-4 rounded shadow"
        >
          <div>
            <h3 className="font-semibold">{c.name}</h3>
            <p>{c.email}</p>
            <p>{c.phone}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(c)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(c._id)}
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
