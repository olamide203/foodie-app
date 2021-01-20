$(document).ready(function() {
  var dataTable = $('#filtertable').DataTable({
      "ordering": true,
      "pageLength":5,
      'aoColumnDefs':[{
          'bSortable':false,
          'aTargets':['nosort'],
      }],
      columnDefs:[
          {type:'date-dd-mm-yyyy',aTargets:[5]}
      ],
      "aoColumns":[
          null,
          null,
          null,
          null,
          null,
          null,
          null
      ],
      // "order":false,
      "bLengthChange":false,
      "dom":'<"top">ct<"top"p><"clear">'
  });
  $("#filterbox").keyup(function(){
      dataTable.search(this.value).draw();
  });
} );


$(".expand").on("mousedown", () => {
  
  let sidebar = $(".sidebar-one");
  if(sidebar.hasClass("reduced")){
    setTimeout(()=>{
      sidebar.removeClass("reduced");
    },1201);
    $(".sidebar-one").animate({width: "250px"}, {duration: 1000, complete: ()=>{
      $('.hide').show({duration: 100, queue: true, easing: 'easeOutCubic'});
    }});
    $(".staff-body").animate({marginLeft: "250px"}, 1200);
    
    
    
  } else{
    setTimeout(()=>{
      sidebar.addClass("reduced");
    },1201);
    $(".hide").hide(100)
    $(".sidebar-one").animate({width: '64px'},1200);
    $(".staff-body").animate({marginLeft: "64px"}, 1200);
    $('.order-dropdown').hide({duration: 200, queue: true, easing: 'easeInCubic'});
    $(".orders").removeClass("active");

  } 
})
try{
  document.getElementById("category").addEventListener("blur", ()=>{
    let category = document.getElementById("category")
    let re = /^\S+$/
    if(!re.test(category.value)){
      category.classList.add("is-invalid")
    }else{
      console.log(re.exec(category.value))
      category.classList.remove("is-invalid")
    }
  });
}catch(error){
  console.log(error);
}

try {
  document.getElementById("image").addEventListener("blur", ()=>{
    let image = document.getElementById("image");
    let re = /^.*(png|jpg|jpeg)$/i;
    if(image.value){
      if(!re.test(image.value)){
        image.value = "";
        image.classList.add("is-invalid");
      }else(
        image.classList.remove("is-invalid")
      );
    }
  });
} catch (error) {
  console.log(error);
}

try {
  document.querySelector(".select-all").addEventListener("click", ()=>{
    orders = document.querySelectorAll(".order-item").forEach((order) =>{
      order.checked = true;
    })
    
   });
 
} catch (error) {
  console.log(error);
}

document.querySelector(".orders").addEventListener('click', ()=>{
  let sidebar = $(".sidebar-one");
  if(sidebar.hasClass("reduced")){
    setTimeout(()=>{
      sidebar.removeClass("reduced");
    },1201);
    $(".sidebar-one").animate({width: "250px"}, {duration: 1000, complete: ()=>{
      $('.hide').show({duration: 100, queue: true, easing: 'easeOutCubic'});
    }});
    $(".staff-body").animate({marginLeft: "250px"}, 1200); 
  }

  document.querySelector(".orders").classList.toggle("active");
  $('.order-dropdown').toggle({duration: 200, queue: true, easing: 'easeInCubic'});
})