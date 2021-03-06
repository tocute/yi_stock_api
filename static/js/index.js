var onBtnStartQuery = function (stock, type) {
  $("#query_result_table").find('thead tr').remove();
  $("#query_result_table").find('tbody tr').remove();
  getStockFourPoints(stock, type)

  $("#k-line-svg").remove();
  drawLine(stock, type)
}

function getStockFourPoints(stock, type) {
  url = "/stock/four_point/"+stock
  headers = { "Content-Type": "application/json", "STOCK-TYPE": type}
  $('#loader').show()
  $.ajax(
    { 
      url: url,
      type: 'GET',
      headers: headers,
      success: function(data, status, jqXHR) 
      {
        updateAPIStatusTable(data)
        $('#loader').hide()
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
        showWarningDialog("[Failed] " + url +"<br/>"+jqXHR.responseText+"<br/><"+jqXHR.status+">");
        $('#loader').hide()
      }
    }
  );
}

function drawLine(stock, type)
{
  url = "/stock/capture/"+stock
  headers = { "Content-Type": "application/json", "STOCK-TYPE": type}
  $('#loader').show()
  $.ajax(
    { 
      url: url,
      type: 'GET',
      headers: headers,
      success: function(data, status, jqXHR) 
      {
        draw_setup(data)
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
        showWarningDialog("[Failed] " + url +"<br/>"+jqXHR.responseText+"<br/><"+jqXHR.status+">");
      }
    }
  );
}

var updateAPIStatusTable = function (list) 
{
  var info= list;
  $("#query_result_table").find('thead tr').remove();
  $("#query_result_table").find('tbody tr').remove();

  $("#query_result_table").find('thead')
      .append($('<tr>')
        .append($('<th>')
          .append("Buy")
          )
        .append($('<th>')
          .append("Sell")
          )
        )
  
  $("#query_result_table").find('tbody')
    .append($('<tr>')
      .append($('<td>')
        .append(info["buy"])
      )
      .append($('<td>')
        .append(info["sell"])
      )
    );
}


var showWarningDialog = function(msg)
{
  $("#dialog_warning_message").html(msg);
  $("#dialog_warning").modal('toggle');
}

$(document).ready
(
  function()
  { 
    $('#loader').hide()
    $("#btn_query_stock").click(() => onBtnStartQuery($("#text_target_stock").val(), $("#select_stock_type").val()));
  }
  
);

