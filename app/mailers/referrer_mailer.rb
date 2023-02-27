class ReferrerMailer < ApplicationMailer
  def send_welcome_email
    mail(to: params[:to_email], subject: 'Thanks for joining our mailing list' )
  end
end
