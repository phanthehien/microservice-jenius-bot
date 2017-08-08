import { run } from 'runjs';
import pkg from '../package.json';

export default {

  deploy() {
    const user = 'hieuvp';
    const name = pkg.name;
    const tag = `${user}/${name}`;

    run(`docker build -t ${name} .`);
    run(`docker tag ${name} ${tag}`);
    run(`docker push ${tag}`);
    run(`docker-cloud stack redeploy ${name}`);
  }

};
