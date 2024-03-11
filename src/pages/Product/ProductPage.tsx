import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { UserData, Product } from "../../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPageStyle.scss";
import { DNA } from "react-loader-spinner";
import _ from "lodash";

const ProductPage = ({ userData }: { userData: UserData | null }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("I'm downloading product data");
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Error retrieving product data");
        }

        const data = await response.json();
        if (data.result && data.result.length > 0) {
          setProduct(data.result[0]);
          setError(null);
        } else {
          throw new Error("No product data available");
        }
      } catch (error) {
        console.error("Error retrieving product data:", error);
        setError("Error retrieving product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = _.debounce(async () => {
    try {
      if (!userData?.userData.id) {
        toast.error("You must be logged in to add a product to your cart.");
        return;
      }

      toast.success("Product added to cart!");
      await axios.post("http://localhost:3001/api/basket/add", {
        userId: userData.userData.id,
        productId: product?.id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  }, 200);

  return (
    <CommonLayout header={null} footer={null}>
      <div className="container box productPage">
        {isLoading ? (
          <div className="loader-container">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <div className="columns">
            <ToastContainer position="bottom-right" />
            <div className="column is-half">
              <p>ID: {product?.id}</p>
              <h1 className="title">{product?.name}</h1>
              <div className="box">
                <p>Description: {product?.description}</p>
              </div>
              <div>
                <p className="price">Price: {product?.price} $</p>
                <button
                  className="basket button is-primary"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
            {product?.imgUrl && (
              <div className="column is-half">
                <figure className="image is-4by3">
                  <img src={product?.imgUrl} alt={product?.name} />
                </figure>
              </div>
            )}
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default ProductPage;
