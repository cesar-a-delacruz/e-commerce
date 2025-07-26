export function parseCart(cart) {
  return cart.map((item) => ({
    id: item.id,
    product: item.product_id,
    name: item.name,
    image: item.image,
    price: item.price,
    stock: item.stock,
    count: item.count,
  }));
}
