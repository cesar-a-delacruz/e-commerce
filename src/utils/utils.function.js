export const convertToCartData = carts => {
  return carts.map(c => {
    return {
      product: c.productId.id,
      name: c.productId.name,
      image: c.productId.image,
      price: c.productId.price,
      stock: c.productId.stock,
      count: c.count,
      id: c.id,
    }
  })
}
