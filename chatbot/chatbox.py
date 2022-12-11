from flask_cors import CORS, cross_origin
from flask import Flask, request
import pickle
import random
from colorama import Fore, Style, Back
import json
import numpy as np
import os
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder
import colorama
from keras.preprocessing.text import Tokenizer
from keras.models import load_model
from keras_preprocessing.sequence import pad_sequences

colorama.init()

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT_DIR)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

with open("intents.json") as file:
    data = json.load(file)
 # load tokenizer object


def get_response(inp):
    # load trained model
    model = load_model('chat_model')

    # load tokenizer object
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # load label encoder object
    with open('label_encoder.pickle', 'rb') as enc:
        lbl_encoder = pickle.load(enc)

    # jsony = request.json
    # dataValue = jsony['msg']
    # responseMessage = ''

    result = model.predict(pad_sequences(Tokenizer.texts_to_sequences(tokenizer, [inp]),
                                         truncating='post', maxlen=20))
    tag = LabelEncoder.inverse_transform(lbl_encoder, [np.argmax(result)])

    print("\n Res's Tag: ", tag)
    for i in (data['intents']):
        # print(i['tag'])
        if (i['tag'] == tag):
            # print("\nSource: ", i['tag'], "\nMatched: ", tag)
            responseMessage = np.random.choice(i['responses'])
            return responseMessage


def chat():
    # load trained model
    model = load_model('chat_model')

    # load tokenizer object
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # load label encoder object
    with open('label_encoder.pickle', 'rb') as enc:
        lbl_encoder = pickle.load(enc)

    # parameters
    max_len = 20

    while True:
        print(Fore.LIGHTBLUE_EX + "User: " + Style.RESET_ALL, end="")
        inp = input()
        if inp.lower() == "quit":
            print(Fore.GREEN + "ChatBot:" + Style.RESET_ALL, "Bye")
            break
        result = model.predict(pad_sequences(Tokenizer.texts_to_sequences(tokenizer, [inp]),
                                             truncating='post', maxlen=max_len))
        tag = LabelEncoder.inverse_transform(lbl_encoder, [np.argmax(result)])

        for i in data['intents']:
            if i['tag'] == tag:
                print(Fore.GREEN + "ChatBot:" + Style.RESET_ALL,
                      np.random.choice(i['responses']))
            # else:
            #     return "I do not understand..."

        # print(Fore.GREEN + "ChatBot:" + Style.RESET_ALL,random.choice(responses))
if __name__ == "__main__":
    print(Fore.YELLOW + "Let's chat! (type 'quit' to exit)" + Style.RESET_ALL)
    while True:
        chat()
        break
