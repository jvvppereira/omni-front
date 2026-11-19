import React, { Component } from 'react';
import twitterLogo from '../twitter.svg';
import './Timeline.css';
import api from '../services/api';
import Tweet from '../components/Tweet';

const POLLING_INTERVAL = 10000; // 10 seconds

export default class Timeline extends Component {
  state = {
    newTweet: '',
    tweets: []
  };

  handleInputChange = (e) => {
    this.setState({ newTweet: e.target.value });
  };

  handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    console.log('[Timeline] Creating tweet:', { content, author });
    await api.post('tweets', { content, author });
    console.log('[Timeline] Tweet created');

    this.setState({ newTweet: '' });
  };

  async componentDidMount() {
    console.log('[Timeline] componentDidMount - starting');
    this.subscribeToEvents();
    this.startPolling();

    console.log('[Timeline] Fetching tweets...');
    const tweets = await api.get('tweets');
    console.log('[Timeline] Tweets fetched:', tweets);

    this.setState({
      tweets
    });
    console.log('[Timeline] State updated');
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => {
    console.log('[Polling] Starting polling every', POLLING_INTERVAL, 'ms');
    this.pollingInterval = setInterval(() => {
      this.fetchTweets();
    }, POLLING_INTERVAL);
  };

  stopPolling = () => {
    if (this.pollingInterval) {
      console.log('[Polling] Stopping polling');
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  };

  fetchTweets = async () => {
    try {
      console.log('[Polling] Fetching tweets...');
      const tweets = await api.get('tweets');
      console.log('[Polling] Tweets fetched:', tweets.length);
      this.setState({ tweets });
    } catch (err) {
      console.error('[Polling] Error fetching tweets:', err);
    }
  };

  subscribeToEvents = () => {
    console.log('[SSE] Connecting to:', `${api.defaults.baseURL}events`);
    const eventSource = new EventSource(`${api.defaults.baseURL}events`);

    eventSource.addEventListener('tweet', (event) => {
      console.log('[SSE] Received tweet event:', event.data);
      const tweet = JSON.parse(event.data);
      this.setState({ tweets: [tweet, ...this.state.tweets] });
    });

    eventSource.addEventListener('like', (event) => {
      console.log('[SSE] Received like event:', event.data);
      const tweet = JSON.parse(event.data);
      this.setState({
        tweets: this.state.tweets.map((t) => t._id === tweet._id ? tweet : t)
      });
    });

    eventSource.onopen = () => {
      console.log('[SSE] Connection opened');
    };

    eventSource.onerror = (err) => {
      console.log('[SSE] Connection error:', err);
      console.log('[SSE] Ready state:', eventSource.readyState);
    };
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img heigth={24} src={twitterLogo} alt="GoTwitter" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets?.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
