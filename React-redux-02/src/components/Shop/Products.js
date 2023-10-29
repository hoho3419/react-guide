import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_DATA = [
  {
    id: 'p1',
    price: 5,
    title: "딥다이브",
    description: '자바스크립트 정말 유명한 책'
  },
  {
    id: 'p2',
    price: 7,
    title: "뇌를 자극하는 알고리즘",
    description: 'C랑 C++ 로 하는 자료구조와 알고리즘'
  },
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(data => (
          <ProductItem
            key={data.id}
            id={data.id}
            title={data.title}
            price={data.price}
            description={data.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
