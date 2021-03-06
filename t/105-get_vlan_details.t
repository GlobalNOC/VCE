#!/usr/bin/perl

use strict;
use warnings;

use Test::More tests => 10;
use Test::Deep;
use GRNOC::WebService::Client;
use Data::Dumper;

`cp t/etc/nm1.sqlite.orig2 t/etc/nm1.sqlite`;

my $client = GRNOC::WebService::Client->new( url => 'http://localhost:8529/vce/services/access.cgi',
                                             realm => 'VCE',
                                             uid => 'aragusa',
                                             passwd => 'unittester',
                                             debug => 0,
                                             timeout => 60 );

my $vlan = $client->get_vlan_details(workgroup => 'ajco', vlan_id => 3);

ok(defined($vlan), "vlan result was defined for AJ");

cmp_deeply($vlan->{results}->[0], {
    'circuit' => {
        'workgroup' => 'ajco',
        'status' => 'Impacted',
        'create_time' => 1479158369,
        'name' => 'test',
        'description' => 'test',
        'switch' => 'foobar',
        'vlan' => '102',
        'endpoints' => [
            {
                'port' => 'eth0/1'
            },
            {
                'port' => 'eth0/2'
            }
        ],
        'username' => 'aragusa',
        'vlan_id' => 3
    }
});

$vlan = $client->get_vlan_details(workgroup => 'ajco', vlan_id => 2);

ok(defined($vlan), "vlan result was defined for AJ");

cmp_deeply($vlan, {
    'results' => [
        {
            'circuit' => {
                'workgroup' => 'ajco',
                'status' => 'Impacted',
                'create_time' => 1479153788,
                'name' => 'test',
                'description' => 'test',
                'switch' => 'foobar',
                'vlan' => 101,
                'endpoints' => [
                    {
                        'port' => 'eth0/1'
                    },
                    {
                        'port' => 'eth0/2'
                    }
                    ],
                'username' => 'aragusa',
                'vlan_id' => 2
            }
        }
        ]
           }
    );


$vlan = $client->get_vlan_details(workgroup => 'ajco', vlan_id => 1);

ok(defined($vlan), "vlan result was defined for AJ");
ok($vlan->{results}->[0]->{circuit}->{workgroup} eq 'edco', 'Got VLAN because of workgroup owned port.');

my $client2 = GRNOC::WebService::Client->new( url => 'http://localhost:8529/vce/services/access.cgi',
                                              realm => 'VCE',
                                              uid => 'ebalas',
                                              passwd => 'unittester',
                                              debug => 0,
                                              timeout => 60 );

$vlan = $client2->get_vlan_details(workgroup => 'edco', vlan_id => 1 );

ok(defined($vlan), "vlan result was defined for Ed");

cmp_deeply($vlan, {
    'results' => [
        {
            'circuit' => {
                'workgroup' => 'edco',
                'status' => 'Impacted',
                'create_time' => 1479158359,
                'name' => 'test',
                'description' => 'test',
                'vlan_id' => 1,
                'vlan' => 10,
                'switch' => 'foobar',
                'username' => 'aragusa',
                'endpoints' => [
                    {
                        'port' => 'eth0/1'
                    },
                    {
                        'port' => 'eth0/2'
                    }
                    ]
            }
        }
        ]
           });


$vlan = $client->get_vlan_details(workgroup => 'edco', vlan_id => 1);

ok(defined($vlan), "Got a proper response");

ok($vlan->{'error'}->{'msg'} eq "User aragusa not in specified workgroup edco");
