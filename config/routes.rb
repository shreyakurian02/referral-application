Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "users/registrations", sessions: "users/sessions" }
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
