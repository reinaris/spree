module Spree
  module Admin
    class InventoryUnitsController < Spree::Admin::ResourceController
      include ActiveSupport::Callbacks

      define_callbacks :load_collection
      set_callback :load_collection, :after, :paginate_collection
      set_callback :load_collection, :after, :search

      def index
        @order_ids = @collection.map(&:order_id).uniq
        @show_by_order = (params[:q][:order_email_cont].present? && @order_ids.count > 1)

        respond_with(@collection)
      end

      private

        def collection
          return @collection if @collection.present?

          run_callbacks :load_collection do
            @collection = super
          end

          @collection.joins(:order).where.not('spree_orders.completed_at' => nil)
        end

        def paginate_collection
          @collection = @collection.order(created_at: :desc)
          .page(params[:page])
          .per(params[:per_page] || Spree::Config[:admin_products_per_page])
        end

        def search
          params[:q] ||= {}

          @search = @collection.ransack(params[:q])
          @collection = @search.result.includes(:order, :shipment)
        end

    end
  end
end
