export const convertToCartData = carts => {
  return carts.map(c => {
    return {
      product: c.product_id,
      name: c.name,
      image: c.image,
      price: c.price,
      stock: c.stock,
      count: c.count,
      id: c.id,
    }
  })
}
