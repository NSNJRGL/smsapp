class CreateLists < ActiveRecord::Migration[6.0]
  def change
    create_table :lists do |t|
      t.string :number
      t.string :message
      t.integer :status

      t.timestamps
    end
  end
end
