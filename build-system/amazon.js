import { run } from 'runjs';
import Config from '../config';

export default {

  deploy() {
    const user = Config.get('/resources/docker/username');
    const name = Config.get('/name');
    const tag = `${user}/${name}`;

    run(`docker build -t ${name} .`);
    run(`docker tag ${name} ${tag}`);
    run(`docker push ${tag}`);
    run(`docker-cloud stack redeploy ${name}`);
  }

};
