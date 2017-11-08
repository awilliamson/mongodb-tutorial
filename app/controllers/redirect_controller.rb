class RedirectController < ApplicationController
	def index
		redirect_to root_url
	end
end

