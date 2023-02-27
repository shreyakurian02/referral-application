Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "users/registrations", sessions: "users/sessions" }

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  resources :referrals, only: %i[index create]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
