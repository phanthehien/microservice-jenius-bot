import { run } from 'runjs';
import config from '../config';

export default {

  deploy() {
    const user = config.resources.docker.username;
    const name = config.name;
    const tag = `${user}/${name}`;

    run(`docker build -t ${name} .`);
    run(`docker tag ${name} ${tag}`);
    run(`docker push ${tag}`);
    run(`docker-cloud stack redeploy ${name}`);
  }

};
