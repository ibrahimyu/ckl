angular.module('app')

.config(function($translateProvider) {
	$translateProvider.translations('en', {
		'promote_laundry': "Promote Laundry",
		'promote_page_title_1': "Promote your laundry to social networks",
		'promote_page_text_1': "By using social networks, you can easily gain visibility to nearby people.",
		"promote_page_text_2": "Promoting your laundry is very easy. Click the button below, and choose networks to share.",
		"promote_now": "Promote Now"
	});

	$translateProvider.translations('id', {
		"promote_laundry": "Promosi Laundry",
		'promote_page_title_1': "Promosikan laundry anda ke jejaring sosial",
		'promote_page_text_1': "Dengan menggunakan jejaring sosial seperti Facebook dan Twitter, anda bisa lebih terlihat ke orang-orang di sekitar anda.",
		"promote_page_text_2": "Mempromosikan laundry anda sangat mudah. Klik tombol di bawah ini, dan pilih jejaring sosial yang anda inginkan.",
		"promote_now": "Promosikan Sekarang"
	});
});
