import { Injectable } from '@nestjs/common';

const Kafka = require('node-rdkafka');

@Injectable()
export class KafkaService {
  private static producer;

  constructor() {
    
  }

  async test() {
    console.log('Kafka version : ' + Kafka.librdkafkaVersion);
    console.log('Kafka features : ' + Kafka.features);
	}

	static async connect() {
		try {
			this.producer = new Kafka.Producer({
				'metadata.broker.list': 'localhost:9092',
				'dr_cb': true
			});
			this.producer.connect();

			console.error('Success connecting to HOST');
		} catch(err) {
			console.error('Problem when connecting to HOST');
			console.error(err);
		}
		
	}
	
	static async produce(topic, message : any, key = null) {
		this.connect();

    var message_str = JSON.stringify(message);
		var value = Buffer.from(message_str);

		this.producer.on('ready', () => {
			try {
				this.producer.produce(
					topic, // Topic
					null, // Partition
					value, // Value
					key, // Key
					Date.now(), // Timestamp
					(err, offset) => {
						if (err) {
							console.error('Error producing message');
							console.error(err)
						}
					}
				);
				this.producer.flush();
				console.error('Success producing message');
			} catch(err) {
				console.error('A problem occurred when sending our message');
				console.error(err);
			}
		});

		this.producer.on('event.error', function(err) {
			console.error('Error from producer');
			console.error(err);
		})
	}

	async strParseJson(str) {
		return JSON.parse(str);
	}
}
