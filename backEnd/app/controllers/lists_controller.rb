class ListsController < ApplicationController
    def index
        @lists = List.where(status: 0)

        render json: @lists 
    end

    def update
        @list = List.find_by(id: params[:id])

        if @list.update_attributes(list_params)
            render json: @lists
        else
            render status => :bad_request
        end
    end

    private

    def list_params
        params.require(:list).permit(:status)
    end
end
