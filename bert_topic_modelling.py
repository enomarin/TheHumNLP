# -*- coding: utf-8 -*-
"""Copie de BERT_Topic_Modelling.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1jl-Ha4ikzKJ_uugEqwgiLKJWFVsz4d6Y

# **BERTopic - Tutorial**
"""

!pip install bertopic[visualization] --quiet

"""# **Imports**"""

import numpy as np
import pandas as pd
import json
from copy import deepcopy
from bertopic import BERTopic
import io
import pandas as pd
from google.colab import files
from textblob import TextBlob 
from textblob import Word
import string

import json

df = pd.read_json('/content/database.json')

docs = list(df.loc[:, "describe_sound"].values)

def remove_punctuation(text):
    no_punct=[words for words in text if words not in string.punctuation]
    words_wo_punct=''.join(no_punct).lower()
    return words_wo_punct

docs = [remove_punctuation(item) for item in docs]  
docs[:5]

"""# **Creating Topics**
# We can then extract most frequent topics:
"""

model = BERTopic(language="english")
topics, probs = model.fit_transform(docs)
model.get_topic_freq()

"""# Get Individual Topics"""

#model.get_topic(0)
#model.get_topic(2)
model.get_topic(14)

"""# **Visualize Topics**"""

model.visualize_topics()
