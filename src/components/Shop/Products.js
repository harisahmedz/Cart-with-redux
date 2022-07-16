import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DummyProducts = [
  {
    id:'p1',
    price:6,
    title:"MY First Book",
    description:'My First Book',
  },
  {
    id:'p2',
    price:6,
    title:"MY Second Book",
    description:'My Second Book',
  }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DummyProducts.map((product)=>(
            <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
          ))
        }

      </ul>
    </section>
  );
};

export default Products;
