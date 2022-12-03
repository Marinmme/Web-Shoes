
//category

$("#add_category").submit(function (event) {
  alert("Category add successful!");
});

$("#update_category").submit(function (event) {

    alert("Category update successful!");

});

$ondeletecategory = $(".table tbody td a.deletecategory");
$ondeletecategory.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/categories/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this category?")) {
    $.ajax(request).done(function (response) {
      alert("Delete category successfully!");
      location.reload();
    });
  }
});


//slider

$("#add_slider").submit(function (event) {
  alert("Slider add successful!");
});

$("#update_slider").submit(function (event) {

    alert("Slider update successful!");

});

$ondeleteslider = $(".table tbody td a.deleteslider");
$ondeleteslider.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/sliders/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this slider?")) {
    $.ajax(request).done(function (response) {
      alert("Delete slider successfully!");
      location.reload();
    });
  }
});

//user

$ondeleteuser = $(".table tbody td a.deleteuser");
$ondeleteuser.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/user/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this user?")) {
    $.ajax(request).done(function (response) {
      alert("Delete user successfully!");
      location.reload();
    });
  }
});

//order

$onhandleorder = $(".table tbody td a.handleorder");
$onhandleorder.click(function () {
  var id = $(this).attr("data-id");
  var value = $(this).attr("value");
  var request = {
    url: `http://localhost:3000/api/orders/handle/${id}`,
    method: "PUT",
    data: {status: value}
  };

    $.ajax(request).done(function (response) {
      location.reload();
    }); 
});

$ondeleteorder = $(".table tbody td a.deleteorder");
$ondeleteorder.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/orders/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this order?")) {
    $.ajax(request).done(function (response) {
      alert("Delete order successfully!");
      location.reload();
    });
  }
});

//comment

$ondeletecomment = $(".table tbody td a.deletecomment");
$ondeletecomment.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/comments/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this comment?")) {
    $.ajax(request).done(function (response) {
      alert("Delete comment successfully!");
      location.reload();
    });
  }
});

//product
$("#add_product").submit(function (event) {
  alert("Product add successful!");
});

$("#update_product").submit(function (event) {
  alert("Product update successful!");
});

$ondeleteproduct = $(".table tbody td a.deleteproduct");
$ondeleteproduct.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/products/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this product?")) {
    $.ajax(request).done(function (response) {
      alert("Delete product successfully!");
      location.reload();
    });
  }
});

//product detail
$("#add_productdetail").submit(function (event) {
  alert("Product detail add successful!");
});

$("#update_productdetail").submit(function (event) {
  alert("Product detail update successful!");
});

$ondeleteproductdetail = $(".table tbody td a.deleteproductdetail");
$ondeleteproductdetail.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/productdetails/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this product detail?")) {
    $.ajax(request).done(function (response) {
      alert("Delete product detail successfully!");
      location.reload();
    });
  }
});

//size
$("#add_size").submit(function (event) {
  alert("Size add successful!");
});

$("#update_size").submit(function (event) {
  alert("Size update successful!");
});



$ondeletesize = $(".table tbody td a.deletesize");
$ondeletesize.click(function () {
  var id = $(this).attr("data-id");

  var request = {
    url: `http://localhost:3000/api/sizes/${id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this size?")) {
    $.ajax(request).done(function (response) {
      alert("Delete size successfully!");
      location.reload();
    });
  }
});
