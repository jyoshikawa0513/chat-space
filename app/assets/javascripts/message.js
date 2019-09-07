$(function() {
  function buildHTML(message){
		var html = `<div class="message">
									<div class="message__upper-info">
										<div class="message__upper-info__talker">
											${ message.name }
										</div>
										<div class="message__upper-info__date">
											${ message.created_at }
										</div>
									</div>
									<div class="lower-message">
										<p class="lower-message__content">
											${ message.content }
										</p>
										${ image }
									</div>
								</div>`
		return html;
	}

	function scroll(){
		$('.chat-main').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
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
		
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $(',submit-btn.val').val('');
		})
		
    .fail(function() {
      // alert('error');
		});
	
  });
});