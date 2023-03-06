import pandas as pd                        
from pytrends.request import TrendReq
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import date

"""

Uses pytrends

TODO
- visualizations for the other queries / data
- refine queries and visualizations
- add by state/city within U.S.
- global vs U.S. query for every visualization

"""

sns.set_theme()

# query for global
query1 = TrendReq()
query1.build_payload(kw_list=['chatGPT'], timeframe='2022-11-01 {}'.format(date.today()))

# query for U.S.
query2 = TrendReq()
query2.build_payload(kw_list=['chatGPT'], timeframe='2022-11-01 {}'.format(date.today()), geo="US")

print("\n\n\n" + "INTEREST OVER TIME global:" + "/n")

df = query1.interest_over_time()
df = df.reset_index()
print(df.head(10))
sns.relplot(data=df, x="date", y="chatGPT", kind="line")
plt.title("ChatGPT Search Popularity Over Time (Global)")
plt.tight_layout()
plt.show()

print("\n\n\n" + "INTEREST OVER TIME US:" + "/n")

df = query2.interest_over_time()
df = df.reset_index()
print(df.head(10))
sns.relplot(data=df, x="date", y="chatGPT", kind="line")
plt.title("ChatGPT Search Popularity Over Time (USA)")
plt.tight_layout()
plt.show()

print("\n\n\n" + "INTEREST BY COUNTRY:" + "/n")

df = query1.interest_by_region(resolution='COUNTRY')
df = df.reset_index()
df = df.sort_values('chatGPT', ascending=False)
print(df.head(10))
sns.barplot(data=df[:20], x="geoName", y="chatGPT")
plt.title("ChatGPT Interest by Country")
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()

print("\n\n\n" + "INTEREST BY STATE:" + "/n")

df = query2.interest_by_region(resolution='SUBREGION')
df = df.reset_index()
df = df.sort_values('chatGPT', ascending=False)
print(df.head(10))
sns.barplot(data=df[:20], x="geoName", y="chatGPT")
plt.title("ChatGPT Interest by US State")
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()

print("\n\n\n" + "RELATED QUERIES:" + "/n")

# returns a dictionary of dataframes
related_queries = query1.related_queries()
print("top:")
print(related_queries['chatGPT']['top'][:10])
print("rising:")
print(related_queries['chatGPT']['rising'][:10])

print("\n\n\n" + "RELATED TOPICS:" + "/n")

# returns a dictionary of dataframes
related_topic = query1.related_topics()
print("top:")
print(related_topic['chatGPT']['top'][['value', 'topic_title', 'topic_type']][:10])
print("rising:")
print(related_topic['chatGPT']['rising'][['value', 'topic_title', 'topic_type']][:10])