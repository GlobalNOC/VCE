package VCE::Database::Tag;

use strict;
use warnings;

use Exporter;

our @ISA = qw( Exporter );
our @EXPORT = qw( add_tag get_tags );


sub add_tag {
    my $self = shift;
    my $mode = shift;
    my $interface_id = shift;
    my $vlan_id = shift;

    $self->{log}->debug("add_tag($mode, $interface_id, $vlan_id)");

    my $q = $self->{conn}->prepare(
        "insert into tag (
           mode, interface_id, vlan_id
         ) values (?, ?, ?)"
    );
    $q->execute(
        $mode,
        $interface_id,
        $vlan_id
    );

    return $self->{conn}->last_insert_id("", "", "tag", "");
}

sub get_tags {
    my $self = shift;
    my %params = @_;

    $self->{log}->debug("get_tags()");

    my $keys = [];
    my $args = [];

    if (defined $params{vlan_id}) {
        push @$keys, 'vlan_id=?';
        push @$args, $params{vlan_id};
    }

    my $values = join(', ', @$keys);

    my $q;
    if ($values) {
        $q = $self->{conn}->prepare(
            "select * from tag
             join interface on tag.interface_id=interface.id
             where $values"
        );

    } else {
        $q = $self->{conn}->prepare(
            "select * from tag
             join interface on tag.interface_id=interface.id"
        );

    }
    $q->execute(@$args);

    my $result = $q->fetchall_arrayref({});
    return $result;
}

return 1;