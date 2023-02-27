# frozen_string_literal: true

module ApiException
  extend ActiveSupport::Concern

  included do
    protect_from_forgery with: :exception

    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from ArgumentError, with: :handle_api_error
  end

  private

    def render_error(status, error)
      render status: status, json: { error: error.message }
    end

    def handle_validation_error(exception)
      render status: :unprocessable_entity, json: { errors: exception.record.errors.full_messages }
    end

    def handle_record_not_found(exception)
      render status: :not_found, json: { error: "#{exception.model.underscore.humanize} not found" }
    end

    def handle_api_error(exception)
      render_error :internal_server_error, exception
    end
end
