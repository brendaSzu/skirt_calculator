# Custom 8 panel A line skirt converter

waist = float(input('Enter your total waist circumference in inches: '))
hip_butt = float(input('Enter the circumference around your hips and ass at the widest point: '))
front_drop = float(input('Enter the number of inches from your natural waist in the front to the widest point of your hips: '))
back_drop = float(input('Enter same at your back, vertical drop: '))

panels = int(input('Enter number of panels'))
panel_width = waist / panels 
hip_level_panel_width = hip_butt / panels
waist_tilt = back_drop - front_drop

# Ease
waist_ease = 1.0 
hip_ease = 1.5

waist_with_ease = waist + waist_ease
hip_with_ease = hip_butt + hip_ease

avg_waist_per_panel = waist_with_ease / panels 
avg_hip_per_panel = hip_with_ease / panels



# Distribution factor: how much extra to push to side/back panels

# a = 0.25 means:

# front panels = base
# side panels = base + 0.25
# back panels = base + 0.25

a = 0.25

# Solve base so totals stay correct:

base_waist = avg_waist_per_panel - a
base_hip = avg_hip_per_panel - a 

front_waist = base_waist
side_waist = base_waist + a 
back_waist = base_waist + 2*a 

front_hip = base_hip
side_hip = base_hip + a 
back_hip = base_hip + 2 * a 

print("\n--- Summary ---")
print(f"Total waist (with ease): {waist_with_ease:.2f} in")
print(f"Total hip (with ease): {hip_with_ease:.2f} in")
print(f"Front drop: {front_drop:.2f} in")
print(f"Back drop: {back_drop:.2f} in")
print(f"Waist tilt (back higher by): {waist_tilt:.2f} in")

print("\nPer panel widths (NO seam allowance yet):")
print(f"Front panels (2x): waist = {front_waist:.3f} in, hip = {front_hip:.3f} in")
print(f"Side panels  (4x): waist = {side_waist:.3f} in, hip = {side_hip:.3f} in")
print(f"Back panels  (2x): waist = {back_waist:.3f} in, hip = {back_hip:.3f} in")

# Quick sanity checks
total_waist_check = 2 * front_waist + 4 * side_waist + 2 * back_waist
total_hip_check = 2 * front_hip + 4 * side_hip + 2 * back_hip

print("\nSanity check (should match totals with ease):")
print(f"Reconstructed waist total: {total_waist_check:.2f} in")
print(f"Reconstructed hip total: {total_hip_check:.2f} in")

length = float(input('Enter the length of skirt from waist to hem in inches: '))
flare_factor = float(input('Enter flare factor (1.0 = straight, 1.3 = classic A-line): '))

front_hem = front_hip * flare_factor
side_hem = side_hip * flare_factor
back_hem = back_hip * flare_factor

print("\nHem widths (before seam allowance):")
print(f"Front panel hem: {front_hem:.3f} in")
print(f"Side panel hem : {side_hem:.3f} in")
print(f"Back panel hem : {back_hem:.3f} in")

# --- SEAM ALLOWANCE ---
SA = 0.5  # half inch seam allowance

front_hem_SA = front_hem + 2 * SA
side_hem_SA  = side_hem  + 2 * SA
back_hem_SA  = back_hem  + 2 * SA

print("\nHem widths (with seam allowance):")
print(f"Front hem + SA: {front_hem_SA:.3f} in")
print(f"Side hem + SA : {side_hem_SA:.3f} in")
print(f"Back hem + SA : {back_hem_SA:.3f} in")

skirt_length = float(input("Enter skirt length from waist to hem in inches: "))
final_length = skirt_length + hem_turn_up

# --- SEAM ALLOWANCES ---
SA = 0.5            # half-inch seam allowance on both sides
waist_SA = 0.5      # allowance at the top for attaching waistband or facing
hem_turn_up = 2.0   # extra inches for the hem fold

# Add SA to waist widths (left + right edges)
front_waist_SA = front_waist + 2 * SA
side_waist_SA  = side_waist  + 2 * SA
back_waist_SA  = back_waist  + 2 * SA

# Add SA to hem widths
front_hem_SA = front_hem + 2 * SA
side_hem_SA  = side_hem  + 2 * SA
back_hem_SA  = back_hem  + 2 * SA

# Add hem allowance to the vertical length
skirt_length = float(input("Enter skirt length from waist to hem in inches: "))
final_panel_length = skirt_length + hem_turn_up + waist_SA 

# TO DO: Print summary of all final calculations after seam allowances, flare, hem fold etc.
print('Your skirt components should be drafted as follows:')
print(f'Length: {final_panel_length}')