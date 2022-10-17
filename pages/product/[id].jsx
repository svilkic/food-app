// LIBS
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { IoFastFoodOutline } from "react-icons/io5";
import { generateID } from "/util/helpers";

// UTILS
import { formatMoney } from "/util/helpers";
import { getProductById } from "/util/firebase.config";
import { addProduct } from "/redux/slices/cartSlice";

// UI
import Counter from "/components/ui/counter/Index";
import Back from "/components/ui/back/Index";

// CSS
import styles from "/styles/Product.module.css";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [food, setFood] = useState(product);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  const handleIngredient = (ingredient) => {
    let ing = [...ingredients];
    if (ingredients.includes(ingredient))
      ing = ing.filter((i) => i !== ingredient);
    else ing.push(ingredient);

    setIngredients(ing);
  };

  const handlePrice = () => {
    let sum = 0;
    sum += parseFloat(food.variants[size].price);
    ingredients.forEach((i) => (sum += parseFloat(i.price)));
    sum = parseFloat(sum * quantity);
    setFinalPrice(Number(sum));
  };

  const handleAddCart = () => {
    dispatch(
      addProduct({
        oid: generateID(),
        ...food,
        ingredients,
        price: food.variants[size].price,
        quantity,
      })
    );
  };

  useEffect(() => {
    handlePrice();
  }, [ingredients, size, quantity]);

  return (
    <div className={styles.container}>
      <Back />
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={food?.img || "/img/size.png"}
            objectFit='contain'
            layout='fill'
            alt=''
          />
        </div>
      </div>
      {/* RIGHT */}
      <div className={styles.right}>
        <h1 className={styles.title}>{food?.name}</h1>
        <span className={styles.price}>{formatMoney(finalPrice)}</span>
        <p className={styles.desc}>{food?.description}</p>

        {/* SIZES */}
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {food?.variants?.map((variant, i) => (
            <div
              key={variant.name}
              className={`${styles.size} ${size === i ? styles.active : ""}`}
              onClick={() => setSize(i)}
            >
              <IoFastFoodOutline size='2rem' />
              &nbsp;
              <div className={styles.sizeInfo}>
                <span className={styles.number}>{variant.name}</span>
                <span className=''>{formatMoney(variant.price)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* INGREDIENTS */}
        {food?.ingredients?.length > 0 && (
          <div>
            <h3 className={styles.choose}>Choose additional ingredients</h3>
            <div className={styles.ingredients}>
              {food?.ingredients?.map((ingredient, i) => (
                <div key={ingredient.name} className={styles.option}>
                  <input
                    onClick={(e) => handleIngredient(ingredient)}
                    type='checkbox'
                    id={ingredient.name}
                    name='double'
                    className={styles.checkbox}
                  />
                  <label htmlFor={ingredient.name}>
                    {ingredient.name}
                    {ingredient.price && ingredient.price > 0 ? (
                      <span className={styles.muted}>
                        &nbsp;( +{formatMoney(ingredient.price)} )
                      </span>
                    ) : undefined}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.add}>
          <h3 className={styles.choose}>Quantity</h3>
          <Counter value={quantity} onChange={setQuantity} />
        </div>
        <div>
          <button className={styles.button} onClick={handleAddCart}>
            Add to Cart | {formatMoney(finalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: url }) {
  const { id } = url;

  const dataDoc = await getProductById(id);

  // If no user, short circuit to 404 page
  if (!dataDoc.exists()) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let product = {};

  product = dataDoc.data();
  const pid = dataDoc.id;

  return {
    props: { product: { pid, ...product } }, // will be passed to the page component as props
  };
}
