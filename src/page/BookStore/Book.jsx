import BookStore from "../../assets/home/bookstore_image.webp";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import Category from "./Category";
import Price from "./Price";
import Filter from "./Filter";
import BookData from "./BookData";
import "./style.css";
function Book() {
  return (
    <div>
      <div className="section warp_background">
        <div className="container">
          <img
            src={BookStore}
            alt="BookStore"
            className="img-fluid"
            style={{ maxwidth: "60%", padding: " 20px 0px 20px 0px" }}
          />

          <div className="bg_collection section">
            <div className="row">
              <aside class="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <Category />
                <Price />
              </aside>
              <div className="main_container collection col-lg-9 col-md-12 col-sm-12">
                <div className="warp-srt-title">
                  <h1 className="title-module d-none">Tất cả sản phẩm</h1>
                  {/* <Filter /> */}
                </div>
                <div className="category-products products">
                  <section className="products-view products-view-grid collection_reponsive">
                    <div className="row">
                      {BookData.map((item, index) => {
                        return (
                          <div
                            className="col-6 col-md-4 col-lg-3 product-col"
                            key={index}
                          >
                            <div className="item_product_main">                   
                              <form action="">
                                <a href="" className="image_thumb">
                                  <img src={item.img} className="lazyload img-responsive center-block loaded" alt="" />
                                </a>
                                <div className="info-product">
                                 
                                  <h3 className="product-name">
                                    <a href="" title="">{item.title}</a>
                                  </h3>
                                  <div className="price-box">{item.price.toLocaleString('vi-VN')}đ</div>
                                </div>
                              </form>
                            </div>
                          </div>
                        );
                      })}
                      
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
