// LIBS
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
// COMPONENTS
import ImageCropper from "/components/ImageCropper";
// CSS
import styles from "./Add.module.css";
// UTILS
import { createProduct } from "/util/firebase.config";
import { generateID } from "/util/helpers";
// CONSTANTS
import { categories } from "/constants";

const Add = ({ setClose }) => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useReducer(
    (prev, e) => ({ ...prev, [e.target.id]: e.target.value }),
    {
      img: "",
      category: categories[0],
      name: "",
      description: "",
      variants: [{ id: Date.now(), name: "", price: 0 }],
      ingredients: [],
    }
  );

  const [file, setFile] = useState(null);

  //variant : {"variant" || "ingredients"}
  const handleAddVariant = (variant = "variants") => {
    let variants;
    variants =
      variant === "variants" ? formData.variants : formData.ingredients;
    variants.push({ id: Date.now(), name: "", price: "" });
    const e = { target: { id: variant, value: variants } };
    setFormData(e);
  };

  //variant : {"variant" || "ingredients"}
  const handleVariantInput = (variant = "variants", i, field, value) => {
    let variants;
    variants =
      variant === "variants" ? formData.variants : formData.ingredients;
    if (field === "name") variants[i].name = value;
    if (field === "price") variants[i].price = value;
    const e = { target: { id: variant, value: variants } };
    setFormData(e);
  };

  //variant : {"variant" || "ingredients"}
  const handleRemoveVariant = (variant = "variants", id) => {
    let variants;
    variants =
      variant === "variants" ? formData.variants : formData.ingredients;
    const e = {
      target: { id: variant, value: variants.filter((v) => v.id !== id) },
    };
    setFormData(e);
  };

  const handleCreate = async () => {
    setUploading(true);
    try {
      const { img } = formData;
      if (img) {
        const payload = new FormData();
        payload.set("key", "b6eb475d2e5e039310c9eafb082982ed");
        payload.append("image", img.split(",").pop()); //remove base64 string imgbb can't upload with it
        // UPLOAD IMG
        const res = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: payload,
        });
        var {
          data: { url, delete_url },
        } = await res.json();
      }
      const newProduct = {
        ...formData,
        img: url,
        deleteImg: delete_url,
      };
      const id = generateID();
      await createProduct(newProduct, id);
      setClose(true);
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          &#10006;
        </span>
        <h2>Add new Product</h2>

        {/* Image input */}
        <div className={styles.item}>
          {/* <label className={styles.label}>Choose an image</label> */}
          {/* <input type='file' onChange={(e) => setFile(e.target.files[0])} /> */}
          <ImageCropper
            id='img'
            onCrop={setFormData}
            className={styles.imageCropper}
          />
        </div>

        {/* Product name input */}
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            id='name'
            className={styles.input}
            type='text'
            onChange={setFormData}
          />
        </div>

        {/* Product category input */}
        <div className={styles.item}>
          <label className={styles.label}>Category</label>
          <select
            id='category'
            className={styles.input}
            type='text'
            onChange={setFormData}
          >
            {categories.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            id='description'
            rows={4}
            type='text'
            className={styles.description}
            onChange={setFormData}
          />
        </div>
        {/* Variant Input */}
        <div className={styles.item}>
          <div>
            <label className={styles.label}>Variants</label>&nbsp;
            <button
              className={styles.extraButton}
              onClick={() => handleAddVariant("variants")}
            >
              +
            </button>
          </div>
          <div className={styles.variantContainer}>
            <div>
              {formData.variants.map((v, i) => (
                <div className={styles.inputGroup} key={v.id}>
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type='text'
                    placeholder='Name'
                    onChange={(e) =>
                      handleVariantInput("variants", i, "name", e.target.value)
                    }
                  />
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type='number'
                    placeholder='Price'
                    onChange={(e) =>
                      handleVariantInput("variants", i, "price", e.target.value)
                    }
                  />

                  {formData.variants.length > 1 && (
                    <button
                      className={styles.extraButton}
                      onClick={() => handleRemoveVariant("variants", v.id)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients Input */}
        <div className={styles.item}>
          <div>
            <label className={styles.label}>Extras</label>&nbsp;
            <button
              className={styles.extraButton}
              onClick={() => handleAddVariant("ingredients")}
            >
              +
            </button>
          </div>
          <div className={styles.extra}>
            <div>
              {formData.ingredients.map((v, i) => (
                <div className={styles.inputGroup} key={v.id}>
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type='text'
                    placeholder='Item'
                    name='text'
                    onChange={(e) =>
                      handleVariantInput(
                        "ingredients",
                        i,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type='number'
                    placeholder='Price'
                    name='price'
                    onChange={(e) =>
                      handleVariantInput(
                        "ingredients",
                        i,
                        "price",
                        e.target.value
                      )
                    }
                  />
                  <button
                    className={styles.extraButton}
                    onClick={() => handleRemoveVariant("ingredients", v.id)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={styles.addButton}
          onClick={handleCreate}
          disabled={uploading}
        >
          {!uploading ? "Create" : "Creating..."}
        </button>
      </div>
    </div>
  );
};

export default Add;

const products = [
  {
    category: "pizza",
    name: "Margarita",
  },
  {
    category: "other",
    name: "Karadjordjeva",
  },
  {
    category: "pizza",
    name: "Capricosa",
  },
];
