from scipy.optimize import minimize
import numpy as np
from services.prediction import predict_conversions
from models.campaign_model import CampaignBase, OptimizationRequest

def optimize_budgets(request: OptimizationRequest):
    """
    Optimizes the budget allocation across multiple campaigns to maximize predicted conversions.
    """
    total_budget = request.total_budget
    campaigns = request.campaigns
    n_campaigns = len(campaigns)

    # Base values for each campaign to allow prediction
    ad_spends = [c.ad_spend for c in campaigns]
    ctrs = [c.ctr for c in campaigns]
    cpcs = [c.cpc for c in campaigns]

    def objective_function(budgets):
        # We want to MAXIMIZE conversions, so we return the NEGATIVE of conversions for scipy.minimize
        
        # Prepare data for prediction
        data = []
        for i in range(n_campaigns):
            data.append({
                'budget': budgets[i],
                'ad_spend': ad_spends[i],
                'ctr': ctrs[i],
                'cpc': cpcs[i]
            })
            
        conversions = predict_conversions(data)
        return -sum(conversions)

    # Initial guess: distribute budget evenly
    initial_guess = np.ones(n_campaigns) * (total_budget / n_campaigns)

    # Bounds: Budget per campaign between 0 and total_budget
    bounds = tuple((0.0, total_budget) for _ in range(n_campaigns))

    # Constraints: Sum of budgets == total_budget
    constraints = ({
        'type': 'eq',
        'fun': lambda b: sum(b) - total_budget
    })

    # Run optimization
    # Options: SLSQP is good for constrained optimization
    result = minimize(
        objective_function, 
        initial_guess, 
        method='SLSQP', 
        bounds=bounds, 
        constraints=constraints,
        options={'maxiter': 100} # limit iterations for speed in this example
    )

    optimized_budgets = result.x
    
    # Calculate predicted conversions for the optimized budgets
    final_data = []
    for i in range(n_campaigns):
        final_data.append({
            'budget': optimized_budgets[i],
            'ad_spend': ad_spends[i],
            'ctr': ctrs[i],
            'cpc': cpcs[i]
        })
    final_conversions = predict_conversions(final_data)

    return optimized_budgets, final_conversions
