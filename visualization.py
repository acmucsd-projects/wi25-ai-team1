import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

acesPerSetInd2024 = pd.read_csv('allStatCSVS/Aces_Per_Set_Individual_2024.csv')
acesPerSetInd2025 = pd.read_csv('allStatCSVS/Aces_Per_Set_Individual_2025.csv')
acesPerSetTeam2024 = pd.read_csv('allStatCSVS/Aces_Per_Set_Team_2024.csv')
acesPerSetTeam2025 = pd.read_csv('allStatCSVS/Aces_Per_Set_Team_2025.csv')
allStat2025 = pd.read_csv('allStatCSVS/Match_W-L_Pctg._Team_2024.csv')
MensNcaaGames2025 = pd.read_csv('2025MensNcaaGames.csv')


print(allStat2025.head())
print(acesPerSetTeam2025.head())

aces_visualization = pd.merge(allStat2025, acesPerSetTeam2025, on = 'Team')
print(aces_visualization)

sns.lineplot(x='Aces', y='Pct.', data=aces_visualization)
plt.show()