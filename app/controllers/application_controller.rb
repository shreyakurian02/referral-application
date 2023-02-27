class ApplicationController < ActionController::Base
  include ApiException

  protect_from_forgery with: :null_session
end
