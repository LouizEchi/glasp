import { ApolloGateway } from '@apollo/gateway'
import ServiceList from './services'


export const APIGateway = new ApolloGateway({
    serviceList: ServiceList
});