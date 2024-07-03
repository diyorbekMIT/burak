console.log("Products frontend javascript file");

$(function () {
    $(".product-collection").on("change", () => {
      const selectedValue = $(".product-collection").val();
  
      if (selectedValue === "DRINK") {
        $("#product-collection").hide();
        $("#product-volume").show();
      } else {
        $("#product-collection").show();
        $("#product-volume").hide();
      }
    });
  
    $("#process-btn").on("click", () => {
      $(".dish-container").slideToggle(500);
      $("#process-btn").css("display", "none");
    });
    $("#cancel-btn").on("click", () => {
      $(".dish-container").slideToggle(100);
      $("#process-btn").css("display", "flex");
    });
  
    $(".new-product-status").on("change", async (e) => {
      const id = e.target.id;
      const productStatus = $(`#${id}.new-product-status`).val();
      console.log("id", id);
      console.log("status", productStatus);
  
      try {
        const response = await axios.post(`/admin/product/${id}`, {
          productStatus: productStatus,
        });
        const result = response.data;
        console.log("res", response.data);
        if (result.data) {
          console.log("Product updated!");
          $(".new-product-status").blur();
        } else alert("Product update !");
      } catch (error) {
        console.log(err);
        alert("Update failed!");
      }
    });
  });

function validateForm() {
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productDescription = $(".product-desc").val();
    const productCollection = $(".product-collection").val();
    const productStatus = $(".product-status").val();

    if 
    (productName === "" || 
    productPrice === "" || 
    productLeftCount === "" || 
    productDescription === "" || 
    productCollection === "" || 
    productStatus === "")
    {
        alert("Please insert all required inputs!");
        return false;
    }else return true;

}

function previewFileHandler(input, order) {
    const imgClassName = input.className;
  
    const file = $(`.${imgClassName}`).get(0).files[0];
    const fileType = file["type"];
    const validationType = ["image/jpg", "image/jpeg", "image/png"];
  
    if (!validationType.includes(fileType)) {
      alert("Only image/jpg, image/jpeg, image/png");
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          $(`#image-section-${order}`).attr("src", reader.result);
        };
  
        reader.readAsDataURL(file);
      }
    }
  }