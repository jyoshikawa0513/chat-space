$(function() {
  function buildHTML(messages){
    var image = messages.image ? `<img class="message-text__image" src=${messages.image}>` : "";

    var html = `<div class="message" data-message-id= "${messages.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${ messages.name }
                    </div>
                    <div class="message__upper-info__date">
                      ${ messages.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ messages.content }
                    </p>
                    ${ image }
                  </div>
                </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(messages) {
      var html = buildHTML(messages);
      $('.messages').append(html);
      $("#new_message")[0].reset();
      scroll();
    })

    .fail(function() {
      alert('メッセージを入力してください');
    })

    .always(function(){
      $('.submit-btn').prop("disabled", false);
    })
  });

  var interval = setInterval(function(){

    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      
      var last_message_id = $('.message:last').data('message-id')
      $.ajax({
        url: "api/messages",
        data: { last_id: last_message_id },
        type: "GET",
        dataType: 'json'
      })

      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(messages){
        insertHTML = buildHTML(messages);         
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        // ScrollToNewMessage();
        });
      })

      .fail(function(){
        alert('自動更新に失敗しました');
      })
      
    } 

    else{
      clearInterval(interval);
    }

  } , 5000 )

});