
-- Add a column to store selected color information
ALTER TABLE public.order_items 
ADD COLUMN selected_color TEXT;

-- Update existing records to have a default empty string for selected_color
UPDATE public.order_items 
SET selected_color = '' 
WHERE selected_color IS NULL;
