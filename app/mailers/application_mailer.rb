class ApplicationMailer < ActionMailer::Base
  default from: "example.com"
  layout "mailer"

  def send_welcome_email
    mail(to: params[:to_email], from: params[:from_email],
    subject: 'Thanks for joining our mailing list' )
  end
end
