module Spree
  module Admin
    class VariantsIndexController < ResourceController

      def index
        respond_with(@collection) do |format|
          format.html { render layout: !request.xhr? }
          format.json { render json: json_data }
        end
      end

      protected

      def model_class
        Spree::Variant
      end

      private

      def collection
        return @collection if @collection.present?
        @search = model_class.ransack(params[:q])
        @collection = @search.result.page(params[:page]).per(Spree::Config[:admin_products_per_page])
      end

    end
  end
end
