module Spree
  module Admin
    module ProductsHelper
      def taxon_options_for(product)
        options = @taxons.map do |taxon|
          selected = product.taxons.include?(taxon)
          content_tag(:option,
                      :value    => taxon.id,
                      :selected => ('selected' if selected)) do
            (taxon.ancestors.pluck(:name) + [taxon.name]).join(" -> ")
          end
        end.join("").html_safe
      end

      def option_types_options_for(product)
        options = @option_types.map do |option_type|
          selected = product.option_types.include?(option_type)
          content_tag(:option,
                      :value    => option_type.id,
                      :selected => ('selected' if selected)) do
            option_type.name
          end
        end.join("").html_safe
      end

      def product_picker_collection product_ids
        # returns an array with values for the product picker collection
        # sorted by name

        product_ids.collect do |id, index|
          product = Spree::Product.find(id)
          Hashie::Mash.new(id: product.id, name: product.name)
        end.sort { |a,b| a.name <=> b.name }
      end
    end
  end
end
