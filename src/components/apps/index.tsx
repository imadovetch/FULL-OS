import { APPS } from '@/data/const'
import { Calculator } from './calculator'
import Layout from './layout'

export function App({ id }: { id: string }) {

    var app = null

    switch (id) {
        case APPS[0].id:
            app = <Calculator/>
            break
    }

    return app
    ? <Layout title="Calc">{app}</Layout>
    : null

}