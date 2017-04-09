var quotes = [
{"quote": "How many cares one loses when one decides not to be something but to be someone.", "author": "Gabrielle 'Coco' Chanel"},
{"quote": "Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.", "author": "Dr. Seuss"},
{"quote": "Imitation is suicide.", "author": "Ralph Waldo Emerson"},
{"quote": "Do your own thing on your own terms and get what you came here for.", "author": "Oliver James"},
{"quote": "Flatter yourself critically.", "author": "Willis Goth Regier"},
{"quote": "Do what you feel in your heart to be right, for you’ll be criticized anyway.", "author": "Eleanor Roosevelt"},
{"quote": "Whenever you find yourself on the side of the majority, it is time to pause and reflect.", "author": "Mark Twain"},
{"quote": "I will not let anyone walk through my mind with their dirty feet.", "author": "Mahatma Gandhi"},
{"quote": "Better to write for yourself and have no public, than to write for the public and have no self.", "author": "Cyril Connolly"},
{"quote": "We must not allow other people’s limited perceptions to define us.", "author": "Virginia Satir"},
{"quote": "Don’t look for society to give you permission to be yourself.", "author": "Steve Maraboli"},
{"quote": "If things go wrong, don’t go with them.", "author": "Roger Babson"},
{"quote": "Wanting to be someone else is a waste of who you are.", "author": "Kurt Cobain"},
{"quote": "Tension is who you think you should be. Relaxation is who you are.", "author": "Chinese Proverb"},
{"quote": "Where’s your will to be weird?", "author": "Jim Morrison"},
{"quote": "Some people say you are going the wrong way, when it’s simply a way of your own.", "author": "Angelina Jolie"},
{"quote": "Remember to always be yourself. Unless you suck.", "author": "Joss Whedon"},
{"quote": "Do what you can, with what you have, where you are.", "author": "Theodore Roosevelt"},
{"quote": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde"},
{"quote": "I took a deep breath and listened to the old bray of my heart. I am. I am. I am.", "author": "Sylvia Plath"},
{"quote": "There came a time when the risk to remain tight in the bud was more painful than the risk it took to blossom.", "author": "Anaïs Nin"},
{"quote": "To find yourself, think for yourself.", "author": "Socrates"},
{"quote": "If you seek authenticity for authenticity’s sake you are no longer authentic.", "author": "Jean Paul Sartre"},
{"quote": "If you cannot be a poet, be the poem.", "author": "David Carradine"},
{"quote": "When one is pretending the entire body revolts.", "author": "Anaïs Nin"},
{"quote": "Be there for others, but never leave yourself behind.", "author": "Dodinsky"},
{"quote": "Do what you must and your friends will adjust.", "author": "Robert Brault"},
{"quote": "Just let awareness have its way with you completely.", "author": "Scott Morrison"},
{"quote": "We must be our own before we can be another’s.", "author": "Ralph Waldo Emerson"},
{"quote": "This above all: to thine own self be true.", "author": "William Shakespeare"}
]

var colors = ["#001f3f", "#0074D9", "#39CCCC", "#3D9970", "#2ECC40", "#FF851B", "#FF4136", "#85144b", "#111111", "#AAAAAA"]

var tweet = $("#twitter");
var nextButton = $("#next");
var buttons = $("button");
var quote = $("#quote");
var author = $("#author");
var body = $("body");

function nextClick() {
  var randomQuote = Math.floor((Math.random() * 30) + 1);
  var randomColor  = Math.floor((Math.random() * 10) + 1);
  quote.text(quotes[randomQuote].quote);
  author.text(quotes[randomQuote].author);
  body.css("background-color", colors[randomColor]);
  buttons.css("background-color", colors[randomColor]);
  var tweetIntent = "https://twitter.com/intent/tweet";
  tweetIntent += '?text="';
  tweetIntent += quotes[randomQuote].quote + '" - ' + quotes[randomQuote].author;
  tweet.attr("href", tweetIntent);
}

nextButton.click(nextClick);

