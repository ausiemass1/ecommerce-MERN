import type { Product } from "../types/Product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  if (!Array.isArray(products)) {
    return <p className="red-text">Products data is invalid</p>;
  }

  return (
    <table className="highlight responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <span className="grey-text">No image</span>
              )}
            </td>
            <td>
              <button
                className="btn-small blue"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>

              <button
                className="btn-small red ml-2"
                onClick={() => onDelete(product._id)}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
